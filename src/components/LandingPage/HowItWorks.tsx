import { IconName } from '../Icon'
import { FC, useState } from 'react'
import { Root as ToggleGroup, Item as ToggleItem } from '@radix-ui/react-toggle-group'
import { Root as Tooltip, Trigger as TooltipTrigger, Content as TooltipContent } from '@radix-ui/react-tooltip'

export const codeSnippets = [
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
]

export type CodeSnippets = typeof codeSnippets

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
            theme: 'primary',
            icon: 'github' as IconName,
            url: '/',
          },
          codeSnippet: 0, // index of code snippet in codeSnippets array
        },
        {
          heading: 'Configure your content source',
          text: (
            <p>
              When working with local markdown or MDX files, you tell Contentlayer the expected shape of your data
              (document type definitions).
            </p>
          ),
          cta: {
            theme: 'primary',
            icon: 'github' as IconName,
            url: '/',
          },
          image: {
            url: '/images/local-data-transformation.png',
            alt: 'Data transformation',
          },
        },
        {
          heading: 'Configure your content source',
          text: (
            <p>
              When working with local markdown or MDX files, you tell Contentlayer the expected shape of your data
              (document type definitions).
            </p>
          ),
          cta: {
            theme: 'primary',
            icon: 'github' as IconName,
            url: '/',
          },
          codeSnippet: 1, // index of code snippet in codeSnippets array
        },
      ],
    },
    {
      title: 'Contentful',
      active: false,
      tooltip: 'Coming soon!',
    },
    {
      title: 'Notion',
      active: false,
      tooltip: 'Coming soon!',
    },
  ],
}

export const HowItWorks: FC<{ codeSnippetsHtml: CodeSnippets }> = ({ codeSnippetsHtml }) => {
  const [selectedTab, setSelectedTab] = useState(content.tabs[0].title)

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 md:px-8 py-16 md:py-24">
      <div className="flex flex-col items-center">
        <h2 className="text-gray-800 font-semibold text-3xl dark:text-gray-200 mb-8">{content.heading}</h2>
        <ToggleGroup
          type="single"
          defaultValue={content.tabs[0].title}
          value={selectedTab}
          onValueChange={(value) => {
            if (value) setSelectedTab(value)
          }}
          aria-label="Text alignment"
          className="inline-block"
        >
          {content.tabs.map(({ title, active, tooltip }, index) => (
            <ToggleItem
              key={index}
              value={title}
              disabled={!active}
              aria-label={title}
              className={`relative overflow-hidden font-semibold focus:outline-none focus:ring-2 focus:ring-violet-300 dark:focus:ring-violet-900 border focus:z-20 ${
                index == 0 ? 'rounded-l-md' : index == content.tabs.length - 1 ? 'rounded-r-md' : '-mx-px'
              } ${
                title == selectedTab
                  ? 'border-violet-300 dark:border-violet-900 z-20'
                  : 'border-gray-200 dark:border-gray-800'
              }`}
            >
              {active ? (
                <div
                  className={`py-2 px-4 ${
                    title == selectedTab
                      ? 'bg-violet-100 text-violet-600 hover:bg-violet-200 dark:text-violet-500 dark:bg-violet-600/20 dark:hover:bg-violet-600/30'
                      : 'text-gray-600 bg-gray-50 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800'
                  }`}
                >
                  {title}
                </div>
              ) : (
                <Tooltip>
                  <TooltipTrigger className="py-2 px-4 font-semibold bg-gray-50 text-gray-400 focus:outline-none dark:bg-gray-900 dark:text-gray-500">
                    {title}
                  </TooltipTrigger>
                  <TooltipContent className="bg-gray-700 rounded text-gray-100 text-sm px-1.5 py-0.5 shadow-md">
                    {tooltip || 'Coming soon!'}
                  </TooltipContent>
                </Tooltip>
              )}
            </ToggleItem>
          ))}
        </ToggleGroup>
      </div>
      <p>{selectedTab}</p>
    </div>
  )
}
