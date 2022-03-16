import { useRouter } from 'next/router'
import { useState } from 'react'
import Image from 'next/image'
import { FC } from 'react'
import { Dashed } from '../Dashed'
import { Icon } from '../Icon'
import { Button } from '../Button'

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
  const [showVideo, setShowVideo] = useState(false)

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-16 pt-16 md:pt-24 lg:pt-32">
      <div className="sm:max-w-md">
        <h1 className="text-slate-800 dark:text-slate-200 text-5xl font-semibold">{content.heading}</h1>
        <p className="text-slate-500 md:text-lg dark:text-slate-400 leading-relaxed mb-6">{content.text}</p>
        <ul className="text-slate-700 md:text-lg dark:text-slate-300 ml-0">
          {content.features.map((feature, index) => (
            <li key={index} className="flex space-x-3">
              <div className="pt-1">
                <Icon name="check" />
              </div>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-col space-y-4 mt-8 sm:flex-row md:flex-col lg:flex-row sm:space-y-0 md:space-y-4 lg:space-y-0 sm:space-x-4 md:space-x-0 lg:space-x-4">
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
      <div className="relative w-full flex items-center">
        <div className="w-full rounded-md overflow-hidden shadow-lg shadow-gray-100 dark:shadow-gray-900">
          {showVideo ? (
            <div className="w-full aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube-nocookie.com/embed/${content.video.youtubeId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          ) : (
            <div className="relative -mb-2">
              <Image
                src={content.video.thumbnail.url}
                alt={content.video.thumbnail.alt}
                width="800"
                height="450"
                placeholder="blur"
                blurDataURL={content.video.thumbnail.url}
              />
              <div
                className="absolute inset-0 flex justify-center items-center cursor-pointer"
                onClick={() => setShowVideo(true)}
              >
                <div className="relative w-16 text-violet-600 dark:text-violet-500 hover:text-violet-500 dark:hover:text-violet-400">
                  <Icon name="play-button" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
