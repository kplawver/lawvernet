const { DateTime } = require("luxon");
const embedEverything = require("eleventy-plugin-embed-everything");

module.exports = function(eleventyConfig) {
  // Embed plugin for YouTube, Vimeo, Spotify, etc.
  eleventyConfig.addPlugin(embedEverything);
  // Pass through static assets
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/css");

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

  eleventyConfig.addFilter("isoDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toISO();
  });

  // Create a collection of posts sorted by date (newest first)
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/**/*.md").sort((a, b) => {
      return b.date - a.date;
    });
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
