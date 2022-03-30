import { defineDocumentType } from 'contentlayer/source-files'
import type * as unified from 'unified'
import { toMarkdown } from 'mdast-util-to-markdown'
import { mdxToMarkdown } from 'mdast-util-mdx'

import { bundleMDX } from 'mdx-bundler'

// import { SEO } from '../nested/SEO'
import { urlFromFilePath } from '../utils'

export type DocHeading = { level: 1 | 2 | 3; title: string }

export const Doc = defineDocumentType(() => ({
  name: 'Doc',
  filePathPattern: `docs/**/*.mdx`,
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
    },
    show_child_cards: {
      type: 'boolean',
      default: false,
    },
    last_edited: {
      type: 'date',
      required: true,
    },
    // seo: { type: 'nested', of: SEO },
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
        doc._raw.flattenedPath
          .split('/')
          // skip `/docs` prefix
          .slice(1)
          .map((dirName) => {
            const re = /^((\d+)-)?(.*)$/
            const [, , orderStr, pathName] = dirName.match(re) ?? []
            const order = orderStr ? parseInt(orderStr) : 0
            return { order, pathName }
          }),
    },
    headings: {
      type: 'json',
      resolve: async (doc) => {
        const headings: DocHeading[] = []

        await bundleMDX({
          source: doc.body.raw,
          xdmOptions: (opts) => {
            opts.remarkPlugins = [...(opts.remarkPlugins ?? []), tocPlugin(headings)]
            return opts
          },
        })

        return [{ level: 1, title: doc.title }, ...headings]
      },
    },
  },
  extensions: {},
}))

const tocPlugin =
  (headings: DocHeading[]): unified.Plugin =>
  () => {
    return (node: any) => {
      node.children
        .filter((_: any) => _.type === 'heading')
        .forEach((heading: any) => {
          const title = toMarkdown({ type: 'paragraph', children: heading.children }, { extensions: [mdxToMarkdown()] })
            .trim()
            // removes MDX in headlines
            .replace(/<.*$/g, '')
            // remove backslashes (e.g. from list items)
            .replace(/\\/g, '')
            .trim()

          return headings.push({ level: heading.depth, title })
        })
    }
  }
