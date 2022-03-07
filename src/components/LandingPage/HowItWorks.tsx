export const codeSnippets = {
  step1: {
    'contentlayer.config.ts': `\
import { defineDocumentType, makeSource } from 'contentlayer/source-files'

const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: \`**/*.md\`,
  fields: {
  title: { type: 'string', required: true },
    date: { type: 'date', required: true }
  },
  computedFields: {
    urlPath: {
      type: 'string',
      resolve: (doc) => \`/posts/\${doc._raw.flattenedPath}\`
    }
  }
}))

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post]
})\
`,
  },
  step3: {
    'pages/posts/[slug].tsx': `\
import { allPages, type Page } from './assets/contentlayer-generated'

export async function getStaticPaths() {
  const paths = allPages.map((page) => page.urlPath)
  return { paths }
}

export async function getStaticProps({ params }) {
  const page = allPages.find((page) => page.urlPath === params.slug)

  return { props: { page } }
}

export default function Page({ page }: { page: Page }) {
  return (
    <div>
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.body.html }} />
    </div>
  )
}\
`,
  },
}

export type CodeSnippets = typeof codeSnippets
