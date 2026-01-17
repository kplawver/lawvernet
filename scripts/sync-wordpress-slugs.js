#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, '..', 'src', 'posts');

// Get WordPress export file from command line
const wpExportFile = process.argv[2];

if (!wpExportFile) {
  console.error('Usage: node scripts/sync-wordpress-slugs.js <wordpress-export.xml>');
  process.exit(1);
}

if (!fs.existsSync(wpExportFile)) {
  console.error(`File not found: ${wpExportFile}`);
  process.exit(1);
}

console.log('WordPress Slug Sync Script');
console.log('==========================\n');

// Read and parse WordPress export
const wpContent = fs.readFileSync(wpExportFile, 'utf8');

// Extract posts from WordPress export
const postRegex = /<item>([\s\S]*?)<\/item>/g;
const wpPosts = [];

let match;
while ((match = postRegex.exec(wpContent)) !== null) {
  const item = match[1];

  // Only process posts (not pages, attachments, etc.)
  const postTypeMatch = item.match(/<wp:post_type><!\[CDATA\[(.*?)\]\]><\/wp:post_type>/);
  if (!postTypeMatch || postTypeMatch[1] !== 'post') continue;

  // Extract title
  const titleMatch = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) ||
                     item.match(/<title>(.*?)<\/title>/);

  // Extract post_name (slug)
  const slugMatch = item.match(/<wp:post_name><!\[CDATA\[(.*?)\]\]><\/wp:post_name>/) ||
                    item.match(/<wp:post_name>(.*?)<\/wp:post_name>/);

  // Extract post date
  const dateMatch = item.match(/<wp:post_date><!\[CDATA\[(.*?)\]\]><\/wp:post_date>/) ||
                    item.match(/<wp:post_date>(.*?)<\/wp:post_date>/);

  if (titleMatch && slugMatch && dateMatch) {
    const slug = slugMatch[1];
    // Only care about slugs with underscores
    if (slug.includes('_')) {
      wpPosts.push({
        title: titleMatch[1].trim(),
        slug: slug,
        date: dateMatch[1].substring(0, 10) // YYYY-MM-DD
      });
    }
  }
}

console.log(`Found ${wpPosts.length} WordPress posts with underscores in slugs\n`);

// Read all local posts
const localFiles = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));

let stats = {
  matched: 0,
  updated: 0,
  alreadyHasSlug: 0,
  notFound: 0
};

// For each WordPress post with underscore slug, find matching local post
for (const wpPost of wpPosts) {
  let found = false;

  for (const file of localFiles) {
    const filePath = path.join(POSTS_DIR, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Parse front matter
    const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!fmMatch) continue;

    const frontMatter = fmMatch[1];

    // Extract title from front matter
    const localTitleMatch = frontMatter.match(/^title:\s*["']?(.*?)["']?\s*$/m) ||
                            frontMatter.match(/^title:\s*["'](.*)["']\s*$/m);
    if (!localTitleMatch) continue;

    let localTitle = localTitleMatch[1].trim();
    // Remove surrounding quotes if present
    if ((localTitle.startsWith('"') && localTitle.endsWith('"')) ||
        (localTitle.startsWith("'") && localTitle.endsWith("'"))) {
      localTitle = localTitle.slice(1, -1);
    }

    // Extract date from front matter
    const localDateMatch = frontMatter.match(/^date:\s*["']?(\d{4}-\d{2}-\d{2})["']?/m);
    if (!localDateMatch) continue;

    const localDate = localDateMatch[1];

    // Normalize titles for comparison
    const normalizeTitle = (t) => t.toLowerCase()
      .replace(/\\"/g, '"')
      .replace(/\\'/g, "'")
      .replace(/\\\\/g, '\\')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&#8217;/g, "'")
      .replace(/&#8220;/g, '"')
      .replace(/&#8221;/g, '"')
      .trim();

    // Match by title and date
    if (normalizeTitle(localTitle) === normalizeTitle(wpPost.title) &&
        localDate === wpPost.date) {
      found = true;
      stats.matched++;

      // Check if already has a slug
      if (frontMatter.match(/^slug:/m)) {
        stats.alreadyHasSlug++;
        break;
      }

      // Add slug to front matter
      const newFrontMatter = frontMatter.trim() + `\nslug: "${wpPost.slug}"`;
      content = content.replace(fmMatch[0], `---\n${newFrontMatter}\n---`);
      fs.writeFileSync(filePath, content);

      console.log(`Updated: ${file}`);
      console.log(`  Slug: ${wpPost.slug}`);
      stats.updated++;
      break;
    }
  }

  if (!found) {
    stats.notFound++;
  }
}

console.log('\n==========================');
console.log('Summary:');
console.log(`  WordPress posts with underscore slugs: ${wpPosts.length}`);
console.log(`  Matched to local posts: ${stats.matched}`);
console.log(`  Updated with slug: ${stats.updated}`);
console.log(`  Already had slug: ${stats.alreadyHasSlug}`);
console.log(`  Not found locally: ${stats.notFound}`);
