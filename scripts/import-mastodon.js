#!/usr/bin/env node

/**
 * Mastodon Import Script
 *
 * Fetches toots from a Mastodon account and saves them as markdown files
 * for use in the Eleventy blog.
 *
 * Environment variables (via .envrc):
 *   MASTODON_URL      - Mastodon instance URL (e.g., https://mastodon.social)
 *   MASTODON_TOKEN    - Access token for the API
 *   MASTODON_USERNAME - Account username (without @)
 *
 * Usage:
 *   npm run import:mastodon
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { DateTime } = require('luxon');

const TOOTS_DIR = path.join(__dirname, '..', 'src', 'toots');
const MEDIA_DIR = path.join(__dirname, '..', 'src', 'assets', 'toots');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const MAX_RETRIES = 5;

async function downloadFile(url, destPath, attempt = 0) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http;
    proto.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return downloadFile(response.headers.location, destPath, attempt).then(resolve).catch(reject);
      }
      if (response.statusCode === 429) {
        // Drain the response so the socket is freed
        response.resume();
        if (attempt >= MAX_RETRIES) {
          reject(new Error(`Rate limited on ${url} after ${MAX_RETRIES} retries`));
          return;
        }
        const resetHeader = response.headers['x-ratelimit-reset'];
        let waitMs;
        if (resetHeader) {
          const resetTime = new Date(resetHeader).getTime();
          waitMs = Math.max(resetTime - Date.now(), 0) + 100;
        } else {
          waitMs = Math.pow(2, attempt + 1) * 1000;
        }
        console.log(`  Rate limited, waiting ${Math.ceil(waitMs / 1000)}s before retry (attempt ${attempt + 1}/${MAX_RETRIES})...`);
        sleep(waitMs)
          .then(() => downloadFile(url, destPath, attempt + 1))
          .then(resolve)
          .catch(reject);
        return;
      }
      if (response.statusCode !== 200) {
        response.resume();
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }
      const fileStream = fs.createWriteStream(destPath);
      response.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
      fileStream.on('error', reject);
    }).on('error', reject);
  });
}

function getExtension(url) {
  const pathname = new URL(url).pathname;
  const ext = path.extname(pathname);
  return ext || '.jpg';
}

function extractHashtags(status) {
  if (status.tags && status.tags.length > 0) {
    return status.tags.map(t => t.name.toLowerCase());
  }
  return [];
}

function buildFrontMatter(status, type, boostOf) {
  const dt = DateTime.fromISO(status.createdAt);
  const fields = {
    date: dt.toISO(),
    mastodonId: status.id,
    mastodonUrl: status.url || status.uri,
    type: type,
  };

  if (boostOf) {
    fields.boostOf = {
      author: boostOf.account.displayName || boostOf.account.username,
      handle: `@${boostOf.account.acct}`,
      url: boostOf.url || boostOf.uri,
    };
  }

  const contentStatus = type === 'boost' ? status.reblog : status;

  if (contentStatus.spoilerText) {
    fields.spoilerText = contentStatus.spoilerText;
  }

  if (contentStatus.mediaAttachments && contentStatus.mediaAttachments.length > 0) {
    fields.media = contentStatus.mediaAttachments.map(m => ({
      url: `/assets/toots/${status.id}-${m.id}${getExtension(m.url)}`,
      alt: m.description || '',
      type: m.type,
    }));
  }

  const hashtags = extractHashtags(contentStatus);
  if (hashtags.length > 0) {
    fields.tags = hashtags;
  }

  // Build YAML using JSON.stringify for values — JSON strings are valid YAML
  // scalars and correctly handle quotes, newlines, backslashes, and unicode.
  const s = JSON.stringify;
  let yaml = '---\n';
  yaml += `date: ${s(fields.date)}\n`;
  yaml += `mastodonId: ${s(fields.mastodonId)}\n`;
  yaml += `mastodonUrl: ${s(fields.mastodonUrl)}\n`;
  yaml += `type: ${s(fields.type)}\n`;

  if (fields.boostOf) {
    yaml += `boostOf:\n`;
    yaml += `  author: ${s(fields.boostOf.author)}\n`;
    yaml += `  handle: ${s(fields.boostOf.handle)}\n`;
    yaml += `  url: ${s(fields.boostOf.url)}\n`;
  }

  if (fields.spoilerText) {
    yaml += `spoilerText: ${s(fields.spoilerText)}\n`;
  }

  if (fields.media) {
    yaml += `media:\n`;
    for (const m of fields.media) {
      yaml += `  - url: ${s(m.url)}\n`;
      yaml += `    alt: ${s(m.alt || '')}\n`;
      yaml += `    type: ${s(m.type)}\n`;
    }
  }

  if (fields.tags) {
    yaml += `tags:\n`;
    for (const tag of fields.tags) {
      yaml += `  - ${s(tag)}\n`;
    }
  }

  yaml += '---\n';
  return yaml;
}

async function main() {
  const mastodonUrl = process.env.MASTODON_URL;
  const mastodonToken = process.env.MASTODON_TOKEN;
  const mastodonUsername = process.env.MASTODON_USERNAME;

  if (!mastodonUrl || !mastodonToken || !mastodonUsername) {
    console.error('Missing required environment variables:');
    console.error('  MASTODON_URL      - Mastodon instance URL');
    console.error('  MASTODON_TOKEN    - Access token');
    console.error('  MASTODON_USERNAME - Account username');
    process.exit(1);
  }

  // Dynamic import since masto is ESM-only
  const { createRestAPIClient } = await import('masto');

  const client = createRestAPIClient({
    url: mastodonUrl,
    accessToken: mastodonToken,
  });

  console.log(`Looking up account: ${mastodonUsername}@${new URL(mastodonUrl).hostname}`);
  const account = await client.v1.accounts.lookup({ acct: mastodonUsername });
  console.log(`Found account: ${account.displayName} (${account.statusesCount} statuses)`);

  // Ensure directories exist
  fs.mkdirSync(TOOTS_DIR, { recursive: true });
  fs.mkdirSync(MEDIA_DIR, { recursive: true });

  let imported = 0;
  let skipped = 0;
  let page = 0;

  // Paginate through all statuses
  for await (const statuses of client.v1.accounts.$select(account.id).statuses.list({
    excludeReplies: true,
    limit: 40,
  })) {
    page++;
    console.log(`Processing page ${page} (${statuses.length} statuses)...`);

    for (const status of statuses) {
      // Never publish followers-only or direct posts
      if (['private', 'direct'].includes(status.visibility)) {
        skipped++;
        continue;
      }

      const dt = DateTime.fromISO(status.createdAt);
      const yearDir = dt.toFormat('yyyy');
      const filename = `${dt.toFormat('LL')}-${dt.toFormat('dd')}-${status.id}.md`;
      const tootDir = path.join(TOOTS_DIR, yearDir);
      const tootPath = path.join(tootDir, filename);

      // Idempotent: skip if file exists
      if (fs.existsSync(tootPath)) {
        skipped++;
        continue;
      }

      // Determine toot type
      let type = 'original';
      let boostOf = null;
      let contentStatus = status;

      if (status.reblog) {
        type = 'boost';
        boostOf = status.reblog;
        contentStatus = status.reblog;
      } else if (status.content && status.content.includes('RE:')) {
        // Quote posts aren't natively supported in Mastodon but some forks have them
        type = 'quote';
      }

      // Download media attachments
      const mediaAttachments = contentStatus.mediaAttachments || [];
      for (const media of mediaAttachments) {
        const ext = getExtension(media.url);
        const mediaFilename = `${status.id}-${media.id}${ext}`;
        const mediaPath = path.join(MEDIA_DIR, mediaFilename);

        if (!fs.existsSync(mediaPath)) {
          try {
            await downloadFile(media.url, mediaPath);
            console.log(`  Downloaded: ${mediaFilename}`);
          } catch (err) {
            console.warn(`  Warning: Failed to download ${media.url}: ${err.message}`);
          }
        }
      }

      // Build and write the markdown file
      fs.mkdirSync(tootDir, { recursive: true });
      const frontMatter = buildFrontMatter(status, type, boostOf);
      const content = contentStatus.content || '';
      fs.writeFileSync(tootPath, frontMatter + '\n' + content + '\n');

      imported++;
    }
  }

  console.log(`\nDone! Imported ${imported} toots, skipped ${skipped} existing.`);
  process.exit(0);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
