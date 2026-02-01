const { DateTime } = require("luxon");
const embedEverything = require("eleventy-plugin-embed-everything");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {
  // Embed plugin for YouTube, Vimeo, Spotify, etc.
  eleventyConfig.addPlugin(embedEverything);

  // Navigation plugin
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  // Pass through static assets
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/.htaccess");

  // Favicon files at root level
  eleventyConfig.addPassthroughCopy({ "src/favicon.ico": "favicon.ico" });
  eleventyConfig.addPassthroughCopy({ "src/apple-touch-icon.png": "apple-touch-icon.png" });
  eleventyConfig.addPassthroughCopy({ "src/favicon-32x32.png": "favicon-32x32.png" });
  eleventyConfig.addPassthroughCopy({ "src/favicon-16x16.png": "favicon-16x16.png" });
  eleventyConfig.addPassthroughCopy({ "src/site.webmanifest": "site.webmanifest" });
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });

  // Date filters
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("LLLL d, yyyy");
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  eleventyConfig.addFilter("yearMonth", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy/LL");
  });

  eleventyConfig.addFilter("monthYear", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("LLLL yyyy");
  });

  eleventyConfig.addFilter("monthYearShort", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("LL/yyyy");
  });

  eleventyConfig.addFilter("isoDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toISO();
  });

  // Create a collection of posts sorted by date (newest first)
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/**/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });

  // Collection of unique years with their posts
  eleventyConfig.addCollection("postsByYear", function(collectionApi) {
    const posts = collectionApi.getFilteredByGlob("src/posts/**/*.md");
    const yearMap = {};

    posts.forEach(post => {
      const year = DateTime.fromJSDate(post.date, { zone: "utc" }).toFormat("yyyy");
      if (!yearMap[year]) {
        yearMap[year] = [];
      }
      yearMap[year].push(post);
    });

    // Convert to array sorted by year descending, with posts sorted by date descending
    return Object.keys(yearMap)
      .sort((a, b) => b - a)
      .map(year => ({
        year,
        posts: yearMap[year].sort((a, b) => b.date - a.date)
      }));
  });

  // Collection of unique year/month combinations with their posts
  eleventyConfig.addCollection("postsByYearMonth", function(collectionApi) {
    const posts = collectionApi.getFilteredByGlob("src/posts/**/*.md");
    const monthMap = {};

    posts.forEach(post => {
      const dt = DateTime.fromJSDate(post.date, { zone: "utc" });
      const key = dt.toFormat("yyyy/LL"); // e.g., "2024/01"
      if (!monthMap[key]) {
        monthMap[key] = {
          year: dt.toFormat("yyyy"),
          month: dt.toFormat("LL"),
          monthName: dt.toFormat("LLLL"),
          posts: []
        };
      }
      monthMap[key].posts.push(post);
    });

    // Convert to array sorted by date descending
    return Object.keys(monthMap)
      .sort((a, b) => b.localeCompare(a))
      .map(key => ({
        ...monthMap[key],
        posts: monthMap[key].posts.sort((a, b) => b.date - a.date)
      }));
  });

  // Excerpt filter for post previews
  eleventyConfig.addFilter("excerpt", (content) => {
    if (!content) return "";
    // Remove HTML tags
    let stripped = content.replace(/<[^>]*>/g, "");
    // Decode HTML entities (strip angle brackets)
    stripped = stripped
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;|&gt;/g, "")
      .replace(/&quot;/g, '"')
      .replace(/&#39;|&apos;/g, "'")
      .replace(/&#(\d+);/g, (_, num) => String.fromCharCode(num))
      .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
    // Remove naked URLs (http://, https://, www.)
    stripped = stripped.replace(/https?:\/\/[^\s]+/g, "");
    stripped = stripped.replace(/www\.[^\s]+/g, "");
    // Clean up extra whitespace
    stripped = stripped.replace(/\s+/g, " ").trim();
    const words = stripped.split(/\s+/).slice(0, 50).join(" ");
    return words + (stripped.split(/\s+/).length > 50 ? "..." : "");
  });

  // Head filter - get first n items from array
  eleventyConfig.addFilter("head", (array, n) => {
    if (!Array.isArray(array)) return [];
    return array.slice(0, n);
  });

  // Humanize tag - convert "web-development" to "Web Development"
  eleventyConfig.addFilter("humanizeTag", (tag) => {
    if (!tag) return "";
    return tag
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
  });

  // Extract domain from URL
  eleventyConfig.addFilter("domain", (url) => {
    if (!url) return "";
    try {
      return new URL(url).hostname;
    } catch {
      return url.replace(/^https?:\/\//, '').split('/')[0];
    }
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
