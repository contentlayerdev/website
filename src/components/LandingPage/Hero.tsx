import { useRouter } from 'next/router'
import { useState } from 'react'
import Image from 'next/image'
import { FC } from 'react'
import { Dashed } from '../Dashed'
import { Icon } from '../Icon'
import { Button } from '../Button'
import { Card } from '../Card'
import { Heading } from '../Heading'
import { Checklist } from '../Checklist'
import { Paragraph } from '../Paragraph'
import { Video } from '../Video'

const content = {
  heading: 'Content made easy for developers',
  text: (
    <>
      Contentlayer is a <Dashed label="content preprocessor" tooltip="TODO: short explanation" /> that validates and
      transforms your content into <Dashed label="type-safe" tooltip="TODO: short explanation" /> JSON you can easily
      import into your application.
    </>
  ),
  features: ['Lightweight & easy to use', 'Great developer experience', 'Blazing fast build & page performance'],
  primaryAction: { label: 'Get started', url: '/' },
  secondaryAction: { label: 'Why Contentlayer?', url: '/docs/concepts/why-contentlayer' },
  video: {
    thumbnail: { url: '/images/intro-thumbnail.jpg', alt: 'Intro to Contentlayer Video Thumbnail' },
    youtubeId: 'jzwMjOl8Iyo',
  },
}

export const Hero: FC = () => {
  const router = useRouter()

  return (
    <div className="mx-auto grid w-full max-w-screen-xl grid-cols-1 gap-16 px-4 pt-8 md:grid-cols-2 md:px-8 md:pt-24 lg:pt-32">
      <div className="space-y-8 sm:max-w-md">
        <Heading level={1}>{content.heading}</Heading>
        <Paragraph className="text-lg">{content.text}</Paragraph>
        <Checklist items={content.features} className="text-lg" />
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 md:flex-col md:space-y-4 md:space-x-0 lg:flex-row lg:space-y-0 lg:space-x-4">
          <Button
            label={content.primaryAction.label}
            action={() => router.push(content.primaryAction.url)}
            theme="primary"
          />
          <Button
            label={content.secondaryAction.label}
            action={() => router.push(content.secondaryAction.url)}
            theme="secondary"
          />
        </div>
      </div>
      <div className="relative flex w-full items-center">
        <Video thumbnail={content.video.thumbnail} videoId={content.video.youtubeId} />
      </div>
    </div>
  )
}
