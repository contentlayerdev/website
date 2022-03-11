import { useRouter } from 'next/router'
import Image from 'next/image'
import { FC } from 'react'
import { Icon } from '../Icon'
import { Button } from '../Button'

const content = {
  heading: 'Content made easy for developers',
  text: (
    <>
      Contentlayer is a{' '}
      <span className="border-b border-dashed border-gray-300 dark:border-gray-500">content preprocessor</span> that
      validates and transforms your content into{' '}
      <span className="border-b border-dashed border-gray-300 dark:border-gray-500">type-safe</span> JSON you can easily
      import into your application.
    </>
  ),
  features: ['Lightweight & easy to use', 'Great developer experience', 'Blazing fast build & page performance'],
  primaryAction: { label: 'Get started', url: '/' },
  secondaryAction: { label: 'Why Contentlayer?', url: '/docs/concepts/why-contentlayer' },
  thumbnail: { url: '/images/intro-thumbnail.jpg', alt: 'Intro to Contentlayer Video Thumbnail' },
}

export const Hero: FC = () => {
  const router = useRouter()

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-16 pt-16 md:pt-24 lg:pt-32">
      <div className="sm:max-w-md">
        <h1 className="text-slate-800 dark:text-slate-200 text-5xl font-semibold">{content.heading}</h1>
        <p className="text-slate-500 md:text-lg dark:text-slate-400 leading-relaxed mb-6">{content.text}</p>
        <ul className="text-slate-700 md:text-lg dark:text-slate-300 ml-0 mb-8">
          {content.features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-3">
              <Icon name="check" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
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
      <div className="relative flex items-center">
        {/* TODO: Embed video */}
        <div className="rounded-md overflow-hidden">
          <div className="-mb-2">
            <Image
              src={content.thumbnail.url}
              alt={content.thumbnail.alt}
              width="800"
              height="450"
              placeholder="blur"
              blurDataURL={content.thumbnail.url}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
