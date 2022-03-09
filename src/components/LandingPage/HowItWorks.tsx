import { IconName } from '../Icon'
import { FC, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ToggleGroup } from '../ToggleGroup'
import { Button } from '../Button'
import { CodeWindow } from '../CodeWindow'
import { ColorScheme } from '../../utils/syntax-highlighting'

export const codeSnippets = {
  howItWorksStep1: [
    {
      file: 'contentlayer.config.ts',
      content: `\
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
  ],
  howItWorksStep3: [
    {
      file: 'pages/posts/[slug].tsx',
      content: `\
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
  ],
} as const

export type CodeSnippet = { file: string; content: string }
export type CodeSnippets = typeof codeSnippets

export type PreprocessedCodeSnippets = Record<ColorScheme, CodeSnippets>

const codesnippetKey = (k: keyof CodeSnippets) => k

const content = {
  heading: 'How Contentlayer works with...',
  tabs: [
    {
      title: 'Local files',
      active: true,
      steps: [
        {
          heading: 'Configure your content source',
          text: (
            <p>
              When working with local markdown or MDX files, you tell Contentlayer the expected shape of your data
              (document type definitions).
            </p>
          ),
          cta: {
            label: 'Explore Example',
            theme: 'primary',
            icon: 'github' as IconName,
            url: '/',
          },
          codeSnippetsKey: codesnippetKey('howItWorksStep1'),
        },
        {
          heading: 'Your content is transformed into data',
          text: (
            <>
              <p>
                Run Contentlayer to process your content. Do this as part of the Next.js dev server, or using the
                Contentlayer CLI.
              </p>
              <p>
                This validates the content, then generates types definitions and outputs data objects ready to be
                imported as a ESM module.
              </p>
            </>
          ),
          image: {
            url: '/images/local-data-transformation.png',
            alt: 'Data transformation',
            width: 561,
            height: 275,
          },
        },
        {
          heading: 'Import data into your application',
          text: (
            <>
              <p>
                Import the data just like you would any other JavaScript library. Use it to render pages, and pass down
                as props to the components on those pages.
              </p>
              <p>
                Keep the development bundle small with tree-shaking and improve the development experience by using the
                generated type definitions.
              </p>
            </>
          ),
          codeSnippetsKey: codesnippetKey('howItWorksStep3'),
        },
      ],
    },
    {
      title: 'Contentful',
      active: false,
      steps: [],
    },
    {
      title: 'Notion',
      active: false,
      steps: [],
    },
  ],
}

export const HowItWorks: FC<{ codeSnippets: CodeSnippets }> = ({ codeSnippets }) => {
  const router = useRouter()
  const [selectedTab, setSelectedTab] = useState('0')

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 md:px-8 py-16 md:py-24">
      <div className="flex flex-col items-center">
        <h2 className="text-gray-800 font-semibold text-3xl dark:text-gray-200 mb-8">{content.heading}</h2>
        <ToggleGroup
          tabs={content.tabs.map(({ title, active }) => {
            return { label: title, disabled: !active }
          })}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      </div>
      {content.tabs[parseInt(selectedTab)].steps.map(({ heading, text, cta, codeSnippetsKey, image }, index) => (
        <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-16">
          <div className="flex space-x-8">
            <div className="shrink-0 w-12 h-12 flex justify-center items-center text-violet-600 font-semibold text-xl rounded-full border border-violet-600">
              {index + 1}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-2.5">{heading}</h3>
              <div className="text-gray-500 dark:text-gray-400 max-w-md">{text}</div>
              {cta && (
                <Button
                  label={cta.label}
                  action={() => router.push(cta.url)}
                  theme="secondary"
                  icon={cta?.icon ?? ''}
                />
              )}
            </div>
          </div>
          {image && (
            <div>
              <Image
                src={image.url}
                alt={image.alt}
                width={image.width}
                height={image.height}
                placeholder="blur"
                blurDataURL={image.url}
              />
            </div>
          )}
          {codeSnippetsKey && (
            <div>
              <CodeWindow snippets={codeSnippets[codeSnippetsKey]} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
