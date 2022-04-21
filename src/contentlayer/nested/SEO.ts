import { defineNestedType } from 'contentlayer/source-files'

export const SEO = defineNestedType(() => ({
  name: 'SEO',
  fields: {
    title: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    imagePath: {
      type: 'string',
      required: true,
    },
  },
  extensions: {},
}))
