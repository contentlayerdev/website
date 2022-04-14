import { FC } from 'react'
import { Button } from '../common/Button'
import { Heading } from './Heading'
import { IconName } from '../common/Icon'
import { Paragraph } from './Paragraph'

const content = {
  heading: 'Frequently Asked Questions',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisi dolor justo, elementum a est sed. Netus justo, aliquet quis ac, est scelerisque.',
  elements: [
    {
      question: 'Can I incrementally adopt Contentlayer?',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisi dolor justo, elementum a est sed. Netus justo, aliquet quis ac, est scelerisque. Ridiculus in lacus, vel egestas risus nulla. Pretium amet, massa vitae lorem aliquam nisl, nullam mus donec.',
    },
    {
      question: 'Does Contentlayer scale?',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisi dolor justo, elementum a est sed. Netus justo, aliquet quis ac, est scelerisque. Ridiculus in lacus, vel egestas risus nulla. Pretium amet, massa vitae lorem aliquam nisl, nullam mus donec.',
    },
    {
      question: 'Will Contentlayer slow down my builds?',
      answer:
        'Quite the opposite. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisi dolor justo, elementum a est sed. Netus justo, aliquet quis ac, est scelerisque. Ridiculus in lacus, vel egestas risus nulla. Pretium amet, massa vitae lorem aliquam nisl, nullam mus donec.',
    },
  ],
  primaryAction: { label: 'Read more in docs', url: '/' },
  secondaryAction: {
    label: 'Ask a question',
    url: '/docs/concepts/why-contentlayer',
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
              <Paragraph>{answer}</Paragraph>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
