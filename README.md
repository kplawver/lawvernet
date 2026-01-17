# lawvernet

A personal blog built with [Eleventy](https://www.11ty.dev/) and styled with Tailwind CSS.

## Quick Start

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

The site will be available at `http://localhost:8080`. The server auto-reloads when you make changes.

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with live reload |
| `npm run build` | Build the site for production (outputs to `_site/`) |
| `npm run clean` | Delete the `_site/` build directory |
| `npm run import` | Import posts from WordPress export XML |

## Creating New Posts

1. Create a new Markdown file in `src/posts/` with the naming convention:
   ```
   YYYY-MM-DD-post-title.md
   ```

2. Add front matter at the top of the file:
   ```yaml
   ---
   title: Your Post Title
   description: A brief description for previews and SEO
   date: 2026-01-17
   tags:
     - tag1
     - tag2
   ---
   ```

3. Write your content in Markdown below the front matter.

### Example Post

```markdown
---
title: My New Post
description: This is what the post is about.
date: 2026-01-17
tags:
  - personal
  - tech
---

This is my post content. You can use **bold**, *italic*, and all standard Markdown.

## Subheadings Work

So do:
- Lists
- Code blocks
- Images
- Links

![Alt text](/assets/images/my-image.jpg)
```

### Front Matter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | The post title |
| `date` | Yes | Publication date (YYYY-MM-DD) |
| `description` | No | Short description for previews and meta tags |
| `tags` | No | Array of tags for categorization |
| `draft` | No | Set to `true` to exclude from build |

## Editing Existing Posts

1. Find the post in `src/posts/`
2. Edit the Markdown file
3. If running `npm run dev`, changes appear automatically

## Adding Images

1. Place images in `src/assets/images/`
2. Reference them in posts:
   ```markdown
   ![Description](/assets/images/filename.jpg)
   ```

## Importing from WordPress

1. Export your WordPress content:
   - Go to WordPress Admin > Tools > Export
   - Select "All content"
   - Download the XML file

2. Run the import:
   ```bash
   npm run import
   ```

3. Follow the prompts:
   - Enter the path to your WordPress XML file
   - Set output directory to `src/posts`
   - Choose whether to download images

4. Review imported posts:
   - Check front matter formatting
   - Verify images downloaded correctly
   - Add `tags: [posts]` if missing from front matter

### Post-Import Cleanup

After importing, you may need to:

- **Fix image paths**: Update paths to match `/assets/images/`
- **Add tags**: Ensure each post has `tags: [posts]` for proper collection handling
- **Review formatting**: Some HTML may not convert cleanly to Markdown
- **Check dates**: Verify dates imported correctly

## Project Structure

```
lawvernet/
├── src/
│   ├── _data/           # Global data files
│   │   └── site.json    # Site metadata
│   ├── _includes/
│   │   └── layouts/     # Page templates
│   ├── assets/          # Static files (images, etc.)
│   ├── posts/           # Blog posts (Markdown)
│   ├── about.njk        # About page
│   ├── feed.njk         # RSS feed template
│   └── index.njk        # Homepage
├── _site/               # Built site (git-ignored)
├── eleventy.config.js   # Eleventy configuration
└── package.json
```

## Customization

### Site Metadata

Edit `src/_data/site.json`:

```json
{
  "title": "Your Site Title",
  "description": "Your site description",
  "url": "https://yourdomain.com",
  "author": {
    "name": "Your Name",
    "email": "you@example.com"
  }
}
```

### Styling

The site uses Tailwind CSS via CDN. To customize:

- Edit the `tailwind.config` in `src/_includes/layouts/base.njk`
- Modify colors, fonts, and spacing as needed

### Layouts

- `src/_includes/layouts/base.njk` - Base HTML template
- `src/_includes/layouts/post.njk` - Blog post template

## Deployment

Build the site and deploy the `_site/` directory:

```bash
npm run build
```

The `_site/` folder contains static HTML files that can be hosted on:
- GitHub Pages
- Netlify
- Vercel
- Any static file host
