---
description: Create a new blog post with the given title
user_invocable: true
---

Create a new blog post in this Eleventy blog.

## Instructions

1. Get the title from the user's input (everything after `/new-post`)
2. If no title provided, ask for one
3. Generate the filename: `YYYY-MM-DD-slugified-title.md` using today's date
4. Create the file in `src/posts/` with this format:

```markdown
---
title: "The Title"
date: YYYY-MM-DD
tags:
---

```

5. Report the created file path and the URL it will be available at: `/YYYY/MM/slug/`
