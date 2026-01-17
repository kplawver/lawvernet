#!/usr/bin/env node

/**
 * WordPress Import Helper Script
 *
 * This script wraps wordpress-export-to-markdown to import posts into the Eleventy blog.
 *
 * Usage:
 *   1. Export your WordPress content from WordPress Admin > Tools > Export
 *   2. Save the XML file to this project directory
 *   3. Run: npm run import
 *   4. Follow the interactive prompts
 *
 * The tool will:
 *   - Convert posts to Markdown files
 *   - Download and save images
 *   - Preserve dates, tags, and categories
 *   - Create proper front matter for Eleventy
 */

const { spawn } = require('child_process');
const path = require('path');

console.log(`
╔════════════════════════════════════════════════════════════════╗
║                  WordPress to Eleventy Import                   ║
╠════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  Before running this import, make sure you have:                ║
║                                                                  ║
║  1. Exported your WordPress content as XML                      ║
║     (WordPress Admin > Tools > Export > All content)            ║
║                                                                  ║
║  2. Saved the XML file somewhere accessible                     ║
║                                                                  ║
║  The importer will ask you for:                                 ║
║  - Path to your WordPress export XML file                       ║
║  - Output directory (use: src/posts)                            ║
║  - Whether to download images                                   ║
║                                                                  ║
╚════════════════════════════════════════════════════════════════╝
`);

// Run the wordpress-export-to-markdown tool
const child = spawn('npx', ['wordpress-export-to-markdown'], {
  stdio: 'inherit',
  cwd: process.cwd()
});

child.on('close', (code) => {
  if (code === 0) {
    console.log(`
╔════════════════════════════════════════════════════════════════╗
║                      Import Complete!                           ║
╠════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  Next steps:                                                    ║
║                                                                  ║
║  1. Review the imported posts in src/posts/                     ║
║                                                                  ║
║  2. You may need to:                                            ║
║     - Add 'tags: [posts]' to front matter if missing            ║
║     - Fix image paths if needed                                 ║
║     - Review and clean up formatting                            ║
║                                                                  ║
║  3. Run 'npm run dev' to preview your imported content          ║
║                                                                  ║
╚════════════════════════════════════════════════════════════════╝
`);
  }
});
