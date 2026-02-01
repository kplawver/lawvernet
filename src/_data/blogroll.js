const fs = require('fs');
const path = require('path');

module.exports = function() {
  const opmlPath = path.join(__dirname, 'blogroll.opml');
  const opmlContent = fs.readFileSync(opmlPath, 'utf-8');

  // Simple OPML parser
  const categories = [];

  // Match category outlines (those with nested outlines)
  const categoryRegex = /<outline[^>]*text="([^"]*)"[^>]*title="([^"]*)"[^>]*>\s*([\s\S]*?)<\/outline>/g;
  const itemRegex = /<outline[^>]*type="rss"[^>]*>/g;

  // Split by category outlines
  const categoryMatches = opmlContent.match(/<outline[^\/]*text="[^"]*"[^>]*>[\s\S]*?<\/outline>\s*(?=<outline|<\/body>)/g);

  if (categoryMatches) {
    for (const categoryBlock of categoryMatches) {
      // Get category name
      const nameMatch = categoryBlock.match(/^<outline[^>]*text="([^"]*)"/);
      if (!nameMatch) continue;

      const category = {
        name: nameMatch[1],
        items: []
      };

      // Get items within this category
      const itemMatches = categoryBlock.match(/<outline[^>]*type="rss"[^>]*\/?\s*>/g);
      if (itemMatches) {
        for (const item of itemMatches) {
          const title = item.match(/text="([^"]*)"/)?.[1] || item.match(/title="([^"]*)"/)?.[1] || '';
          const url = item.match(/htmlUrl="([^"]*)"/)?.[1] || '';
          const description = item.match(/description="([^"]*)"/)?.[1] || '';

          if (title && url) {
            category.items.push({ title, url, description });
          }
        }
      }

      if (category.items.length > 0) {
        categories.push(category);
      }
    }
  }

  return { categories };
};
