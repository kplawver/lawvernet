#!/usr/bin/env node

/**
 * Pagefind index builder
 *
 * Indexes the built site HTML, then adds custom records for each toot so
 * they appear in search results. Toot results link to the original post on
 * Mastodon since toots don't have individual pages on this site.
 *
 * Replaces: npx pagefind --site _site
 */

import { readdirSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TOOTS_DIR = join(__dirname, '..', 'src', 'toots');
const SITE_DIR = join(__dirname, '..', '_site');

function parseToot(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return null;

  const meta = {};
  for (const line of match[1].split('\n')) {
    const m = line.match(/^(\w+): (.+)$/);
    if (m) {
      try {
        meta[m[1]] = JSON.parse(m[2]);
      } catch {
        meta[m[1]] = m[2];
      }
    }
  }

  return { meta, body: match[2].trim() };
}

function stripHtml(html) {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function getTootFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getTootFiles(fullPath));
    } else if (entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  return files;
}

async function main() {
  const pagefind = await import('pagefind');
  const { index } = await pagefind.createIndex({});

  console.log('Indexing site HTML...');
  const { errors: dirErrors } = await index.addDirectory({ path: SITE_DIR });
  if (dirErrors.length) {
    console.error('Errors indexing site:', dirErrors);
  }

  console.log('Adding toots to index...');
  const tootFiles = getTootFiles(TOOTS_DIR);
  let count = 0;

  for (const filePath of tootFiles) {
    const raw = readFileSync(filePath, 'utf8');
    const parsed = parseToot(raw);
    if (!parsed) continue;

    const { meta, body } = parsed;
    if (!meta.mastodonUrl || !meta.date) continue;

    const plainText = stripHtml(body);
    if (!plainText) continue;

    const date = new Date(meta.date);
    const title = `Toot from ${date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })}`;

    const { errors } = await index.addCustomRecord({
      url: meta.mastodonUrl,
      content: plainText,
      meta: { title },
      language: 'en',
    });

    if (errors.length) {
      console.warn(`  Warning for ${filePath}:`, errors);
    }

    count++;
  }

  console.log(`Added ${count} toots to index`);

  const { errors: writeErrors } = await index.writeFiles({
    outputPath: join(SITE_DIR, 'pagefind'),
  });

  if (writeErrors.length) {
    console.error('Errors writing index:', writeErrors);
    process.exit(1);
  }

  console.log('Search index written successfully');
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
