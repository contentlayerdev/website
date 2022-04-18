import { FC } from 'react'
import { Button } from '../common/Button'
import { Heading } from './Heading'
import { IconName } from '../common/Icon'
import { Paragraph } from './Paragraph'
import Markdown from 'markdown-to-jsx'

const content = {
  heading: 'Frequently Asked Questions',
  description: `We've heard a lot of questions about Contentlayer. These are the questions we get most often.`,
  elements: [
    {
      question: 'What problem is Contentlayer solving?',
      answer: `Modern web frameworks don't prescribe a method for parsing content. They provide powerful page routing and rendering processes, but it's up to you to provide it with content. Contentlayer persists the great developer experience provided by modern web frameworks by making it easy to work with content in your web project. [Learn more](/docs/other/faq#what-problem-is-contentlayer-solving).`,
    },
    {
      question: 'Why is Contentlayer fast?',
      answer: `Contentlayer leverages optimizations of build tools to the fullest to make processing source content a breeze. It then caches that content intelligently and builds incrementally. When you update content, Contentlayer will only build what has changed, taking advantage of work already done. [Learn more](/docs/concepts/how-contentlayer-works).`,
    },
    {
      question: 'Can I use Contentlayer with my existing tools?',
      answer: `Contentlayer is built to be framework agnostic. Contentlayer is a content processor at its core, but provides modules for importing content from various sources, and uses plugins to provide tight integration with modern frameworks. [Learn more](/docs/other/faq#can-i-use-contentlayer-with-my-existing-tools).`,
    },
  ],
  primaryAction: { label: 'Read more in docs', url: '/docs/other/faq' },
  secondaryAction: {
    label: 'Ask a question',
    url: 'https://github.com/contentlayerdev/contentlayer/issues/new',
    icon: 'external-link' as IconName,
  },
}

export const FAQ: FC = () => {
  return (
    <div className="mt-16 bg-gray-50 dark:bg-gray-900/50 md:mt-0">
      <div className="mx-auto grid w-full max-w-screen-xl grid-cols-1 gap-8 px-4 py-16 md:grid-cols-2 md:px-8 md:py-24 lg:py-32">
        <div className="space-y-8 md:max-w-md">
          <Heading level={2}>{content.heading}</Heading>
          <Paragraph>{content.description}</Paragraph>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 md:flex-col md:space-y-4 md:space-x-0 lg:flex-row lg:space-y-0 lg:space-x-4">
            <Button label={content.primaryAction.label} href={content.primaryAction.url} theme="primary" />
            <Button
              label={content.secondaryAction.label}
              href={content.secondaryAction.url}
              theme="secondary"
              icon={content.secondaryAction?.icon}
            />
          </div>
        </div>
        <ul className="m-0 list-none space-y-8">
          {content.elements.map(({ question, answer }, index) => (
            <li key={index} className="space-y-4">
              <Heading level={3}>{question}</Heading>
              <div className="leading-relaxed">
                <Markdown>{answer}</Markdown>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
