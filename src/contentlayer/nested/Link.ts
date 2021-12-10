import { defineNestedType } from 'contentlayer/source-files'

export const Link = defineNestedType(() => ({
  name: 'Link',
  fields: {
    label: {
      type: 'string',
      required: true,
    },
    url: {
      type: 'string',
      required: true,
    },
    isExternal: {
      type: 'boolean',
      default: false,
    },
  },
  extensions: {},
}))
