import Image from 'next/image'
import { FC } from 'react'
import { Checklist } from './Checklist'
import { Heading } from './Heading'
import { Icon, IconName } from '../common/Icon'
import { Paragraph } from './Paragraph'

const content = {
  blocks: [
    {
      icon: 'code-light' as IconName,
      heading: 'Just use JS/TS',
      text: 'No need to learn a new query language or complicated API docs to read. Import and manipulate your content as data directly with the JavaScript methods you know and love.',
      features: [
        <>
          Simply <code>import</code> your content as data
        </>,
        'No new query language to learn',
        'Works great with your site framework',
      ],
    },
    {
      icon: 'check-circle' as IconName,
      heading: 'Built-in code confidence',
      text: 'Automatically-generated type definitions and configurable data validations ensure that your data is properly structured across your application.',
      features: ['Validates your content & frontmatter', 'Generates TypeScript types', 'Great error messages'],
    },
    {
      icon: 'lightning' as IconName,
      heading: 'Build. Faster.',
      text: 'Contentlayer + Next.js brings faster build times than Next.js alone or up against other frameworks, like Gatsby.',
      features: ['Incremental & parallel builds', 'Instant content live-reload', 'Scales to 100k of documents'],
    },
  ],
}

export const Features: FC = () => {
  return (
    <div className="mt-16 bg-gray-50 dark:bg-gray-900/50 md:mt-24 lg:mt-32">
      <div className="mx-auto grid w-full max-w-screen-xl grid-cols-1 gap-16 px-4 py-16 md:px-8 md:py-24 lg:grid-cols-3 lg:py-32">
        {content.blocks.map(({ icon, heading, text, features }, index) => (
          <div key={index} className="max-w-xl space-y-4 md:mx-auto lg:mx-0">
            <div className="w-12 rounded-full border border-violet-200 bg-violet-100 p-2.5 text-violet-600 dark:border-violet-900 dark:bg-violet-900/50 dark:text-violet-500">
              <Icon name={icon} />
            </div>
            <Heading level={3}>{heading}</Heading>
            <Paragraph>{text}</Paragraph>
            <Checklist items={features} />
          </div>
        ))}
      </div>
    </div>
  )
}
