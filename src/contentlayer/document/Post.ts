import { defineDocumentType, defineNestedType } from '@contentlayer/source-files'
import type * as unified from 'unified'
import { mdxToMarkdown } from 'mdast-util-mdx'
import { toMarkdown } from 'mdast-util-to-markdown'
import { bundleMDX } from 'mdx-bundler'
import { urlFromFilePath } from '../utils'
import { SEO } from '../nested/SEO'

type PostHeading = { level: 1 | 2 | 3; title: string }

const RelatedPost = defineNestedType(() => ({
  name: 'RelatedPost',
  fields: {
    slug: { type: 'string', required: true },
  },
}))

const CoverImage = defineNestedType(() => ({
  name: 'CoverImage',
  fields: {
    url: { type: 'string', required: true },
    alt: { type: 'string', required: true },
    width: { type: 'number', required: true },
    height: { type: 'number', required: true },
  },
}))

const Author = defineNestedType(() => ({
  name: 'Author',
  fields: {
    name: { type: 'string', required: true },
    handle: { type: 'string', required: true },
    avatar: { type: 'string', required: true },
  },
}))

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `blog/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    cover_image: {
      type: 'nested',
      of: CoverImage,
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
      type: 'list',
      of: Author,
      required: true,
    },
    related_posts: {
      type: 'list',
      of: RelatedPost,
      required: false,
    },
    seo: {
      type: 'nested',
      of: SEO,
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
      resolve: (post) => urlFromFilePath(post).replace(/^\/blog\//, ''),
    },
    headings: {
      type: 'json',
      resolve: async (doc) => {
        const headings: PostHeading[] = []

        await bundleMDX({
          source: doc.body.raw,
          mdxOptions: (opts) => {
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
