import { defineDocumentType } from 'contentlayer/source-files'
import type * as unified from 'unified'
import { mdxToMarkdown } from 'mdast-util-mdx'
import { toMarkdown } from 'mdast-util-to-markdown'
import { bundleMDX } from 'mdx-bundler'
import { urlFromFilePath } from '../utils'

type PostHeading = { level: 1 | 2 | 3; title: string }

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `blog/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the page',
      required: true,
    },
    excerpt: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'date',
      required: true,
    },
    authors: {
      type: 'string',
      required: true,
    },
  },
  computedFields: {
    url_path: {
      type: 'string',
      description:
        'The URL path of this page relative to site root. For example, the site root page would be "/", and doc page would be "docs/getting-started/"',
      resolve: urlFromFilePath,
    },
    slug: {
      type: 'string',
      resolve: (post) => urlFromFilePath(post).replace('blog/', ''),
    },
    headings: {
      type: 'json',
      resolve: async (doc) => {
        const headings: PostHeading[] = []

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
  (headings: PostHeading[]): unified.Plugin =>
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