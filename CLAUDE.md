# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

```bash
npm run dev      # Start dev server at localhost:8080 with live reload
npm run build    # Build static site to _site/
npm run clean    # Remove _site/ directory
npm run import   # Import WordPress XML export to Markdown
```

## Architecture

This is an Eleventy static site blog with Tailwind CSS styling.

### Directory Structure

- `src/` - Source files
  - `_data/site.json` - Global site metadata (title, author, URL)
  - `_includes/layouts/` - Nunjucks templates (base.njk, post.njk)
  - `posts/` - Markdown blog posts with YAML front matter
  - `assets/` - Static files (images, downloads)
- `_site/` - Generated output (git-ignored)
- `eleventy.config.js` - Eleventy configuration with custom filters

### Key Patterns

**Posts** use directory data file (`src/posts/posts.json`) for shared front matter:
- Default layout: `layouts/post.njk`
- Auto-tagged with `posts` for collection
- URL pattern: `/YYYY/MM/DD/slug/`

**Templates** use Nunjucks (`.njk`). Posts are Markdown processed through Nunjucks.

**Custom filters** in `eleventy.config.js`:
- `readableDate` - Format date as "January 17, 2026"
- `htmlDateString` - Format as "2026-01-17"
- `isoDate` - ISO 8601 format
- `excerpt` - First 50 words of content
- `head` - Limit array to first n items

### Styling

Tailwind CSS loaded via CDN in base layout. Configuration inline in `<script>` tag in `base.njk`.
