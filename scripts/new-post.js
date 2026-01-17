#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, '..', 'src', 'posts');

// Get title from command line
const title = process.argv.slice(2).join(' ');

if (!title) {
  console.error('Usage: npm run new "Your Post Title"');
  process.exit(1);
}

// Generate slug from title
const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '')
  .substring(0, 50)
  .replace(/-$/, '');

// Get today's date
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const dateStr = `${year}-${month}-${day}`;

// Generate filename
const filename = `${dateStr}-${slug}.md`;
const filePath = path.join(POSTS_DIR, filename);

// Check if file already exists
if (fs.existsSync(filePath)) {
  console.error(`File already exists: ${filename}`);
  process.exit(1);
}

// Create post content
const content = `---
title: "${title.replace(/"/g, '\\"')}"
date: ${dateStr}
tags:
---

`;

fs.writeFileSync(filePath, content);

console.log(`Created: src/posts/${filename}`);
console.log(`URL: /${year}/${month}/${slug}/`);
