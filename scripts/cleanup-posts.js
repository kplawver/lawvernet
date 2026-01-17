#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const INPUT_DIR = path.join(__dirname, '..', 'output', 'posts');
const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'posts');
const IMAGES_DIR = path.join(__dirname, '..', 'src', 'assets', 'images');

// Stats tracking
const stats = {
  postsProcessed: 0,
  backslashesFixed: 0,
  textileBlockquotes: 0,
  textileHeadings: 0,
  htmlEntitiesDecoded: 0,
  frontMatterFixed: 0,
  imagesCopied: 0,
  errors: []
};

// Ensure output directories exist
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Decode HTML entities
function decodeHtmlEntities(text) {
  const entities = {
    '&lt;': '<',
    '&gt;': '>',
    '&amp;': '&',
    '&quot;': '"',
    '&#34;': '"',
    '&#39;': "'",
    '&apos;': "'",
    '&nbsp;': ' ',
    '&hellip;': '\u2026',
    '&mdash;': '\u2014',
    '&ndash;': '\u2013',
    '&lsquo;': '\u2018',
    '&rsquo;': '\u2019',
    '&ldquo;': '\u201C',
    '&rdquo;': '\u201D',
  };

  let result = text;
  let changed = false;

  for (const [entity, char] of Object.entries(entities)) {
    if (result.includes(entity)) {
      result = result.split(entity).join(char);
      changed = true;
    }
  }

  // Also decode numeric entities like &#123;
  const numericPattern = /&#(\d+);/g;
  result = result.replace(numericPattern, (match, num) => {
    changed = true;
    return String.fromCharCode(parseInt(num, 10));
  });

  if (changed) stats.htmlEntitiesDecoded++;
  return result;
}

// Fix rogue backslashes at end of lines
function fixBackslashes(content) {
  // Replace \\ at end of lines with double newline (paragraph break)
  const original = content;
  let result = content.replace(/\\\\\s*$/gm, '\n');
  // Also handle \\ followed by newline
  result = result.replace(/\\\\\n/g, '\n\n');
  // Handle standalone \\ in middle of text (line break intent)
  result = result.replace(/\s*\\\\\s*/g, '\n\n');

  if (result !== original) stats.backslashesFixed++;
  return result;
}

// Convert Textile blockquotes to Markdown
function fixTextileBlockquotes(content) {
  const original = content;
  // bq. at start of line becomes >
  let result = content.replace(/^bq\.\s+/gm, '> ');
  // Also handle bq. with attributes like bq(class).
  result = result.replace(/^bq\([^)]*\)\.\s+/gm, '> ');

  if (result !== original) stats.textileBlockquotes++;
  return result;
}

// Convert Textile headings to Markdown
function fixTextileHeadings(content) {
  const original = content;
  let result = content;

  // h1. through h6.
  result = result.replace(/^h1\.\s+/gm, '# ');
  result = result.replace(/^h2\.\s+/gm, '## ');
  result = result.replace(/^h3\.\s+/gm, '### ');
  result = result.replace(/^h4\.\s+/gm, '#### ');
  result = result.replace(/^h5\.\s+/gm, '##### ');
  result = result.replace(/^h6\.\s+/gm, '###### ');

  // Also handle headings with attributes like h4(class).
  result = result.replace(/^h1\([^)]*\)\.\s+/gm, '# ');
  result = result.replace(/^h2\([^)]*\)\.\s+/gm, '## ');
  result = result.replace(/^h3\([^)]*\)\.\s+/gm, '### ');
  result = result.replace(/^h4\([^)]*\)\.\s+/gm, '#### ');
  result = result.replace(/^h5\([^)]*\)\.\s+/gm, '##### ');
  result = result.replace(/^h6\([^)]*\)\.\s+/gm, '###### ');

  if (result !== original) stats.textileHeadings++;
  return result;
}

// Fix escaped characters that shouldn't be escaped
function fixEscapedChars(content) {
  let result = content;
  // Fix \^ (escaped caret)
  result = result.replace(/\\\^/g, '^');
  return result;
}

// Fix front matter - ensure tags includes 'posts'
function fixFrontMatter(content) {
  const frontMatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontMatterMatch) return content;

  let frontMatter = frontMatterMatch[1];
  const afterFrontMatter = content.slice(frontMatterMatch[0].length);

  // Check if tags already exists
  if (frontMatter.includes('tags:')) {
    // Check if 'posts' is already in tags
    if (!frontMatter.includes('"posts"') && !frontMatter.includes("'posts'") && !frontMatter.includes('- posts')) {
      // Add posts to existing tags
      frontMatter = frontMatter.replace(
        /tags:\s*\n(\s+-)/,
        'tags:\n  - "posts"\n$1'
      );
      // Handle inline array format
      frontMatter = frontMatter.replace(
        /tags:\s*\[([^\]]*)\]/,
        (match, existing) => `tags: ["posts", ${existing}]`
      );
      stats.frontMatterFixed++;
    }
  } else {
    // Add tags field
    frontMatter = frontMatter.trim() + '\ntags:\n  - "posts"';
    stats.frontMatterFixed++;
  }

  return `---\n${frontMatter}\n---${afterFrontMatter}`;
}

// Update image paths from relative to absolute
function fixImagePaths(content, postSlug) {
  let result = content;

  // Fix markdown image syntax: ![alt](images/file.jpg) -> ![alt](/assets/images/posts/slug/file.jpg)
  result = result.replace(
    /!\[([^\]]*)\]\(images\/([^)]+)\)/g,
    (match, alt, filename) => `![${alt}](/assets/images/posts/${postSlug}/${filename})`
  );

  // Fix linked images: [![alt](images/file.jpg)](link)
  result = result.replace(
    /\[\!\[([^\]]*)\]\(images\/([^)]+)\)\]/g,
    (match, alt, filename) => `[![${alt}](/assets/images/posts/${postSlug}/${filename})]`
  );

  return result;
}

// Copy images from post folder to assets
function copyImages(postDir, postSlug) {
  const imagesDir = path.join(postDir, 'images');
  if (!fs.existsSync(imagesDir)) return;

  const destDir = path.join(IMAGES_DIR, 'posts', postSlug);
  ensureDir(destDir);

  const files = fs.readdirSync(imagesDir);
  for (const file of files) {
    const src = path.join(imagesDir, file);
    const dest = path.join(destDir, file);

    if (fs.statSync(src).isFile()) {
      fs.copyFileSync(src, dest);
      stats.imagesCopied++;
    }
  }
}

// Generate a clean filename from post directory name
function generateFilename(postDir, frontMatter) {
  const dirName = path.basename(postDir);

  // Try to extract date from front matter
  const dateMatch = frontMatter.match(/date:\s*["']?(\d{4}-\d{2}-\d{2})/);
  const date = dateMatch ? dateMatch[1] : '2000-01-01';

  // Clean up the slug
  let slug = dirName
    .replace(/[_]/g, '-')
    .replace(/[^a-z0-9-]/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();

  // Limit slug length
  if (slug.length > 50) {
    slug = slug.substring(0, 50).replace(/-$/, '');
  }

  return `${date}-${slug}.md`;
}

// Process a single post
function processPost(postDir) {
  const indexFile = path.join(postDir, 'index.md');

  if (!fs.existsSync(indexFile)) {
    return;
  }

  try {
    let content = fs.readFileSync(indexFile, 'utf8');
    const postSlug = path.basename(postDir);

    // Apply all fixes
    content = decodeHtmlEntities(content);
    content = fixBackslashes(content);
    content = fixTextileBlockquotes(content);
    content = fixTextileHeadings(content);
    content = fixEscapedChars(content);
    content = fixFrontMatter(content);
    content = fixImagePaths(content, postSlug);

    // Copy images
    copyImages(postDir, postSlug);

    // Generate output filename
    const frontMatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    const frontMatter = frontMatterMatch ? frontMatterMatch[1] : '';
    const filename = generateFilename(postDir, frontMatter);

    // Write to output directory
    const outputFile = path.join(OUTPUT_DIR, filename);
    fs.writeFileSync(outputFile, content);

    stats.postsProcessed++;

    if (stats.postsProcessed % 100 === 0) {
      console.log(`  Processed ${stats.postsProcessed} posts...`);
    }
  } catch (err) {
    stats.errors.push({ postDir, error: err.message });
  }
}

// Main execution
function main() {
  console.log('WordPress Import Cleanup Script');
  console.log('================================\n');

  // Check input directory exists
  if (!fs.existsSync(INPUT_DIR)) {
    console.error(`Error: Input directory not found: ${INPUT_DIR}`);
    process.exit(1);
  }

  // Ensure output directories exist
  ensureDir(OUTPUT_DIR);
  ensureDir(IMAGES_DIR);

  console.log(`Input:  ${INPUT_DIR}`);
  console.log(`Output: ${OUTPUT_DIR}`);
  console.log(`Images: ${IMAGES_DIR}\n`);

  // Get all post directories
  const postDirs = fs.readdirSync(INPUT_DIR)
    .map(name => path.join(INPUT_DIR, name))
    .filter(p => fs.statSync(p).isDirectory());

  console.log(`Found ${postDirs.length} posts to process...\n`);

  // Process each post
  for (const postDir of postDirs) {
    processPost(postDir);
  }

  // Print summary
  console.log('\n================================');
  console.log('Cleanup Complete!\n');
  console.log('Summary:');
  console.log(`  Posts processed:      ${stats.postsProcessed}`);
  console.log(`  Backslashes fixed:    ${stats.backslashesFixed}`);
  console.log(`  Textile blockquotes:  ${stats.textileBlockquotes}`);
  console.log(`  Textile headings:     ${stats.textileHeadings}`);
  console.log(`  HTML entities decoded: ${stats.htmlEntitiesDecoded}`);
  console.log(`  Front matter fixed:   ${stats.frontMatterFixed}`);
  console.log(`  Images copied:        ${stats.imagesCopied}`);

  if (stats.errors.length > 0) {
    console.log(`\nErrors: ${stats.errors.length}`);
    for (const err of stats.errors.slice(0, 10)) {
      console.log(`  - ${path.basename(err.postDir)}: ${err.error}`);
    }
    if (stats.errors.length > 10) {
      console.log(`  ... and ${stats.errors.length - 10} more`);
    }
  }

  console.log('\nNext steps:');
  console.log('  1. Review a few posts to verify fixes');
  console.log('  2. Run "npm run build" to test the build');
  console.log('  3. Run "npm run dev" to preview the site');
}

main();
