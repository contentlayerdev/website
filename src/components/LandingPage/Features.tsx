import Image from 'next/image'
import { FC } from 'react'
import { Icon } from '../Icon'
import { IconName } from '../Icon'

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
    <div className="bg-gray-50 mt-16 md:mt-24 dark:bg-gray-900/50">
      <div className="w-full max-w-screen-xl mx-auto px-4 md:px-8 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {content.blocks.map(({ icon, heading, text, features }, index) => (
          <div key={index} className="max-w-xl md:mx-auto lg:mx-0">
            <div className="w-12 text-violet-600 bg-violet-200 rounded-full p-2 dark:bg-violet-900/50">
              <Icon name={icon} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mt-8">{heading}</h3>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">{text}</p>
            <ul className="text-gray-700 dark:text-gray-300 ml-0 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <Icon name="check" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
