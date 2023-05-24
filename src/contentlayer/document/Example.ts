import { defineDocumentType } from '@contentlayer/source-files'
import { getLastEditedDate, urlFromFilePath } from '../utils'

export const Example = defineDocumentType(() => ({
  name: 'Example',
  filePathPattern: `examples/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the page',
      required: true,
    },
    nav_title: {
      type: 'string',
      description: 'Override the title for display in nav',
    },
    label: {
      type: 'string',
    },
    excerpt: {
      type: 'string',
      required: true,
    },
    github_repo: {
      type: 'string',
      description: 'The string to use in stackblitz.embedGithubProject.',
      required: false,
    },
    open_file: {
      type: 'string',
      description: 'The file to open in the stackblitz playground.',
      required: false,
    },
  },
  computedFields: {
    url_path: {
      type: 'string',
      description:
        'The URL path of this page relative to site root. For example, the site root page would be "/", and doc page would be "docs/getting-started/"',
      resolve: urlFromFilePath,
    },
    pathSegments: {
      type: 'json',
      resolve: (doc) =>
        doc._raw.flattenedPath.split('/').map((dirName) => {
          const re = /^((\d+)-)?(.*)$/
          const [, , orderStr, pathName] = dirName.match(re) ?? []
          const order = orderStr ? parseInt(orderStr) : 0
          return { order, pathName }
        }),
    },
    last_edited: { type: 'date', resolve: getLastEditedDate },
  },
  extensions: {},
}))
