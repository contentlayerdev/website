import { defineDocumentType } from "contentlayer/source-files";

export const GlobalConfig = defineDocumentType(() => ({
  name: "GlobalConfig",
  filePathPattern: `config/global.yaml`,
  isSingleton: true,
  fields: {
    title: {
      type: "string",
      description: "The title of the site",
      required: true,
    },
  },
  extensions: {},
}));
