import { defineDocumentType } from "contentlayer/source-files";

// import { SEO } from '../nested/SEO'
import { urlFromFilePath } from "../utils";

export const Doc = defineDocumentType(() => ({
  name: "Doc",
  filePathPattern: `docs/**/*.md`,
  fields: {
    title: {
      type: "string",
      description: "The title of the page",
      required: true,
    },
    nav_title: {
      type: "string",
      description:
        "An optional title used to override the label presented in the nav",
    },
    // seo: { type: 'nested', of: SEO },
  },
  computedFields: {
    url_path: {
      type: "string",
      description:
        'The URL path of this page relative to site root. For example, the site root page would be "/", and doc page would be "docs/getting-started/"',
      resolve: urlFromFilePath,
    },
    pathSegments: {
      type: "json",
      resolve: (doc) =>
        doc._raw.flattenedPath
          .split("/")
          // skip `/docs` prefix
          .slice(1)
          .map((dirName) => {
            const re = /^((\d+)-)?(.*)$/;
            const [, , orderStr, pathName] = dirName.match(re) ?? [];
            const order = orderStr ? parseInt(orderStr) : 0;
            return { order, pathName };
          }),
    },
  },
  extensions: {},
}));
