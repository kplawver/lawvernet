#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, '..', 'src', 'posts');

let fixed = 0;

// Properly escape a title for YAML
function escapeYamlTitle(title) {
  // Remove surrounding quotes if present
  let clean = title.trim();
  if ((clean.startsWith('"') && clean.endsWith('"')) ||
      (clean.startsWith("'") && clean.endsWith("'"))) {
    clean = clean.slice(1, -1);
  }

  // If title contains special chars, we need to quote it
  const needsQuotes = /[:#\[\]{}|>&*!?,\\]/.test(clean) ||
                      clean.includes('"') ||
                      clean.includes("'") ||
                      clean.startsWith(' ') ||
                      clean.endsWith(' ');

  if (!needsQuotes) {
    return clean;
  }

  // If it contains double quotes but no single quotes, use single quotes
  if (clean.includes('"') && !clean.includes("'")) {
    return `'${clean}'`;
  }

  // If it contains single quotes but no double quotes, use double quotes
  if (clean.includes("'") && !clean.includes('"')) {
    // Escape backslashes in double-quoted strings
    const escaped = clean.replace(/\\/g, '\\\\');
    return `"${escaped}"`;
  }

  // If it contains both, escape the double quotes
  if (clean.includes('"') && clean.includes("'")) {
    const escaped = clean.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    return `"${escaped}"`;
  }

  // Default: use double quotes with escaped backslashes
  const escaped = clean.replace(/\\/g, '\\\\');
  return `"${escaped}"`;
}

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

  // Find title line and fix it
  const titleMatch = frontMatter.match(/^title:\s*(.+)$/m);
  if (titleMatch) {
    const originalTitle = titleMatch[1];
    const fixedTitle = escapeYamlTitle(originalTitle);

    if (fixedTitle !== originalTitle) {
      frontMatter = frontMatter.replace(
        /^title:\s*.+$/m,
        `title: ${fixedTitle}`
      );
    }
  }

  if (frontMatter !== originalFrontMatter) {
    content = content.replace(fmMatch[0], `---\n${frontMatter}\n---`);
    fs.writeFileSync(filePath, content);
    console.log(`Fixed: ${file}`);
    fixed++;
  }
}

console.log(`\nFixed ${fixed} files with YAML issues.`);
