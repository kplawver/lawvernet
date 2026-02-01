const fs = require('fs');
const path = require('path');

const OPML_PATH = path.join(__dirname, '../src/_data/blogroll.opml');
const TIMEOUT_MS = 10000;

async function checkUrl(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; BlogrollChecker/1.0)'
      }
    });
    clearTimeout(timeout);
    return { ok: response.ok, status: response.status };
  } catch (err) {
    clearTimeout(timeout);
    if (err.name === 'AbortError') {
      return { ok: false, status: 'timeout' };
    }
    // Try GET if HEAD fails (some servers don't support HEAD)
    try {
      const controller2 = new AbortController();
      const timeout2 = setTimeout(() => controller2.abort(), TIMEOUT_MS);
      const response = await fetch(url, {
        method: 'GET',
        signal: controller2.signal,
        redirect: 'follow',
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; BlogrollChecker/1.0)'
        }
      });
      clearTimeout(timeout2);
      return { ok: response.ok, status: response.status };
    } catch (err2) {
      return { ok: false, status: err2.name === 'AbortError' ? 'timeout' : 'error' };
    }
  }
}

async function main() {
  console.log('Reading OPML file...');
  let opml = fs.readFileSync(OPML_PATH, 'utf-8');

  // Remove all xmlUrl attributes
  console.log('Removing xmlUrl attributes...');
  opml = opml.replace(/\s*xmlUrl="[^"]*"/g, '');

  // Extract all outline elements with htmlUrl
  const outlineRegex = /<outline[^>]*htmlUrl="([^"]*)"[^>]*\/?\s*>/g;
  const matches = [...opml.matchAll(outlineRegex)];

  console.log(`Found ${matches.length} blogs to check...\n`);

  const toRemove = [];

  for (const match of matches) {
    const [fullMatch, url] = match;
    process.stdout.write(`Checking ${url}... `);

    const result = await checkUrl(url);

    if (!result.ok) {
      console.log(`FAILED (${result.status})`);
      toRemove.push({ fullMatch, url, reason: result.status });
    } else {
      console.log('OK');
    }
  }

  // Remove failed entries
  if (toRemove.length > 0) {
    console.log(`\nRemoving ${toRemove.length} unreachable blogs...`);
    for (const { fullMatch, url, reason } of toRemove) {
      console.log(`  - ${url} (${reason})`);
      // Match the entire line containing this outline element
      const escapedMatch = fullMatch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      opml = opml.replace(new RegExp(`\\s*${escapedMatch}`, 'g'), '');
    }
  }

  // Clean up any empty lines that might have been left
  opml = opml.replace(/\n\s*\n\s*\n/g, '\n\n');

  // Write the cleaned OPML back
  fs.writeFileSync(OPML_PATH, opml);
  console.log(`\nDone! Removed ${toRemove.length} entries, kept ${matches.length - toRemove.length}.`);
}

main().catch(console.error);
