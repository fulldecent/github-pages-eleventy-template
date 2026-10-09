import { HtmlBasePlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
  // Project pages are served from /<repository>/. HtmlBasePlugin rewrites
  // root-absolute URLs such as /css/site.css. page.url already includes that
  // prefix, so a template that prints page.url and also uses this plugin
  // writes the prefix twice. Links in this site use filePathStem instead.
  // https://www.11ty.dev/docs/plugins/html-base/
  eleventyConfig.addPlugin(HtmlBasePlugin);

  eleventyConfig.addPassthroughCopy({ "src/css": "css" });

  // A trail log reads in the order the walks happened.
  eleventyConfig.addCollection("note", (collectionApi) => {
    return collectionApi.getFilteredByTag("note").sort((a, b) => a.date - b.date);
  });
}

export const config = {
  markdownTemplateEngine: "njk",
  htmlTemplateEngine: "njk",
  dir: {
    input: "src",
    includes: "_includes",
    output: "build",
  },
};
