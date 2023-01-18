import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { Icon } from '../common/Icon'
import { User } from '../common/User'
import { Card } from '../common/Card'

const content = {
  tweet: {
    text: 'Having type-safe access to my content has been extremely helpful. Contentlayer provides a nice abstraction between your Markdown files or CMS and your application.',
    person: {
      name: 'Lee Robinson',
      bio: 'Developer Relations at Vercel',
      avatar: 'https://pbs.twimg.com/profile_images/1587647097670467584/adWRdqQ6_400x400.jpg',
    },
  },
  projects: {
    heading: 'Used in _ projects', // _ gets replaced with actual count
    cta: {
      label: (
        <span className="inline-flex items-center space-x-2">
          <span>Explore on GitHub</span>
          <span className="block w-5">
            <Icon name="github" />
          </span>
        </span>
      ),
      url: 'https://github.com/contentlayerdev/contentlayer/network/dependents',
    },
    avatars: [
      'https://avatars.githubusercontent.com/u/77748010?s=120&v=4',
      'https://avatars.githubusercontent.com/u/76196237?s=120&v=4',
      'https://avatars.githubusercontent.com/u/51397083?s=120&v=4',
      'https://avatars.githubusercontent.com/u/12715704?s=120&v=4',
      'https://avatars.githubusercontent.com/u/34954499?s=120&v=4',
      'https://avatars.githubusercontent.com/u/16396161?s=120&v=4',
      'https://avatars.githubusercontent.com/u/47774076?s=120&v=4',
      'https://avatars.githubusercontent.com/u/84158781?s=120&v=4',
      'https://avatars.githubusercontent.com/u/1552357?s=120&v=4',
      'https://avatars.githubusercontent.com/u/49778014?s=120&v=4',
      'https://avatars.githubusercontent.com/u/75498339?s=120&v=4',
      'https://avatars.githubusercontent.com/u/441774?s=120&v=4',
      'https://avatars.githubusercontent.com/u/10709345?s=120&v=4',
      'https://avatars.githubusercontent.com/u/7504237?s=120&v=4',
      'https://avatars.githubusercontent.com/u/65501165?s=120&v=4',
      'https://avatars.githubusercontent.com/u/5955802?s=120&v=4',
    ],
  },
}

export const Testimonials: FC<{ usedByCount: number }> = ({ usedByCount }) => {
  return (
    <div className="mx-auto grid w-full max-w-screen-xl grid-cols-1 gap-8 px-4 pt-16 md:grid-cols-3 md:px-8 md:pt-24">
      <Card className="space-y-8 p-8 md:col-span-2 md:p-12 lg:p-16">
        <p className="mx-auto max-w-lg text-center font-light italic text-slate-500 dark:text-slate-400 md:text-lg">
          <q>{content.tweet.text}</q>
        </p>
        <div className="flex justify-center">
          <User {...content.tweet.person} />
        </div>
      </Card>
      <Card className="h-64 border-violet-100 md:h-auto">
        <Link href={content.projects.cta.url}>
          <a className="relative block h-full w-full" target="_blank" rel="noreferrer">
            <div className="absolute inset-x-3 -top-8 grid grid-cols-4 gap-x-3 sm:grid-cols-5 md:grid-cols-3 lg:grid-cols-4">
              {content.projects.avatars
                .map((url) => ({ url, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ url }, index) => (
                  <div
                    key={index}
                    className={`flex aspect-square items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-800
                ${index % 2 ? 'mt-3' : ''}
                `}
                  >
                    <div className="relative h-8 w-8 overflow-hidden rounded-full">
                      <Image src={url} alt={'Profile image'} layout="fill" placeholder="blur" blurDataURL={url} />
                    </div>
                  </div>
                ))}
            </div>
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-b from-violet-50/50 via-violet-50/95 to-violet-50 p-8 dark:from-gray-900/30 dark:via-gray-900/95 dark:to-gray-900/100 lg:p-16">
              <p className="mb-2 text-center text-xl font-semibold text-violet-600 dark:text-violet-500">
                {content.projects.heading.replace('_', usedByCount.toString())}
              </p>
              <Link href={content.projects.cta.url}>
                <p className="text-center">{content.projects.cta.label}</p>
              </Link>
            </div>
          </a>
        </Link>
      </Card>
    </div>
  )
}
