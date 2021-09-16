import { defineDocumentType } from "contentlayer/source-files";

import { Link } from "../fragments/Link";

export const HeaderConfig = defineDocumentType(() => ({
  name: "HeaderConfig",
  filePathPattern: `config/header.json`,
  isSingleton: true,
  fields: {
    nav_links: {
      type: "list",
      description: "List of navigation links",
      of: Link,
    },
  },
  extensions: {},
}));
