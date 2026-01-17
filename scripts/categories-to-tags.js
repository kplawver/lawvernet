#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, '..', 'src', 'posts');

let stats = {
  processed: 0,
  converted: 0,
  duplicatesRemoved: 0
};

// Get all markdown files
const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));

for (const file of files) {
  const filePath = path.join(POSTS_DIR, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Match front matter
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) continue;

  let frontMatter = fmMatch[1];
  const originalFrontMatter = frontMatter;

  // Extract categories
  const categoriesMatch = frontMatter.match(/^categories:\s*\n((?:\s+-\s*"[^"]*"\n?|\s+-\s*'[^']*'\n?|\s+-\s*[^\n]+\n?)*)/m);

  // Also handle inline array format: categories: ["one", "two"]
  const inlineCategoriesMatch = frontMatter.match(/^categories:\s*\[([^\]]*)\]/m);

  let categories = [];

  if (categoriesMatch) {
    // Parse YAML list format
    const catLines = categoriesMatch[1].split('\n');
    for (const line of catLines) {
      const match = line.match(/^\s+-\s*"([^"]*)"|^\s+-\s*'([^']*)'|^\s+-\s*(.+)$/);
      if (match) {
        const cat = (match[1] || match[2] || match[3] || '').trim();
        if (cat) categories.push(cat);
      }
    }
  } else if (inlineCategoriesMatch) {
    // Parse inline array format
    const items = inlineCategoriesMatch[1].split(',');
    for (const item of items) {
      const clean = item.trim().replace(/^["']|["']$/g, '');
      if (clean) categories.push(clean);
    }
  }

  if (categories.length === 0) {
    stats.processed++;
    continue;
  }

  // Extract existing tags
  const tagsMatch = frontMatter.match(/^tags:\s*\n((?:\s+-\s*"[^"]*"\n?|\s+-\s*'[^']*'\n?|\s+-\s*[^\n]+\n?)*)/m);
  const inlineTagsMatch = frontMatter.match(/^tags:\s*\[([^\]]*)\]/m);

  let tags = [];

  if (tagsMatch) {
    const tagLines = tagsMatch[1].split('\n');
    for (const line of tagLines) {
      const match = line.match(/^\s+-\s*"([^"]*)"|^\s+-\s*'([^']*)'|^\s+-\s*(.+)$/);
      if (match) {
        const tag = (match[1] || match[2] || match[3] || '').trim();
        if (tag) tags.push(tag);
      }
    }
  } else if (inlineTagsMatch) {
    const items = inlineTagsMatch[1].split(',');
    for (const item of items) {
      const clean = item.trim().replace(/^["']|["']$/g, '');
      if (clean) tags.push(clean);
    }
  }

  // Merge categories into tags
  const originalTagCount = tags.length;
  for (const cat of categories) {
    // Normalize for comparison (lowercase)
    const catLower = cat.toLowerCase();
    const exists = tags.some(t => t.toLowerCase() === catLower);
    if (!exists) {
      tags.push(cat);
    } else {
      stats.duplicatesRemoved++;
    }
  }

  // Remove the categories section
  frontMatter = frontMatter.replace(/^categories:\s*\n(?:\s+-\s*"[^"]*"\n?|\s+-\s*'[^']*'\n?|\s+-\s*[^\n]+\n?)*/m, '');
  frontMatter = frontMatter.replace(/^categories:\s*\[[^\]]*\]\n?/m, '');

  // Remove existing tags section (we'll rewrite it)
  frontMatter = frontMatter.replace(/^tags:\s*\n(?:\s+-\s*"[^"]*"\n?|\s+-\s*'[^']*'\n?|\s+-\s*[^\n]+\n?)*/m, '');
  frontMatter = frontMatter.replace(/^tags:\s*\[[^\]]*\]\n?/m, '');

  // Clean up any double newlines
  frontMatter = frontMatter.replace(/\n{3,}/g, '\n\n').trim();

  // Add merged tags
  if (tags.length > 0) {
    const tagsYaml = tags.map(t => `  - "${t}"`).join('\n');
    frontMatter = frontMatter + '\ntags:\n' + tagsYaml;
  }

  if (frontMatter !== originalFrontMatter) {
    content = content.replace(fmMatch[0], `---\n${frontMatter}\n---`);
    fs.writeFileSync(filePath, content);
    stats.converted++;
  }

  stats.processed++;

  if (stats.processed % 500 === 0) {
    console.log(`  Processed ${stats.processed} posts...`);
  }
}

console.log('\nCategories to Tags Conversion Complete!\n');
console.log(`  Posts processed:     ${stats.processed}`);
console.log(`  Posts converted:     ${stats.converted}`);
console.log(`  Duplicates removed:  ${stats.duplicatesRemoved}`);
