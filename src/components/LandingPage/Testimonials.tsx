import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { Icon } from '../Icon'
import { User } from '../User'

const content = {
  tweet: {
    text: 'Having type-safe access to my content has been extremely helpful. Contentlayer provides a nice abstraction between your Markdown files or CMS and your application.',
    user: {
      name: 'Lee Robinson',
      position: 'Developer Relations at Vercel',
      avatar: 'https://pbs.twimg.com/profile_images/1194080814688079872/6qhYKGKC_400x400.jpg',
    },
  },
  projects: {
    heading: 'Used in 0 projects', // 0 gets replaced with actual count
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
    <div className="w-full max-w-screen-xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 md:pt-24">
      <div className="md:col-span-2 bg-gray-50/50 border border-gray-100 rounded-2xl p-8 md:p-12 lg:p-16 space-y-8 dark:bg-gray-900/25 dark:border-gray-900">
        <p className="text-slate-500 font-light md:text-lg italic text-center max-w-lg mx-auto dark:text-slate-400">
          <q>{content.tweet.text}</q>
        </p>
        <div className="flex justify-center">
          <User {...content.tweet.user} />
        </div>
      </div>
      <div className="bg-gray-50/50 border border-violet-100 rounded-2xl overflow-hidden h-64 md:h-auto dark:bg-gray-900/25 dark:border-gray-800">
        <div className="relative w-full h-full">
          <div className="absolute inset-x-3 -top-8 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-3 lg:grid-cols-4 gap-x-3">
            {content.projects.avatars.map((url, index) => (
              <div
                key={index}
                className={`bg-gray-100 rounded-lg aspect-square flex justify-center items-center dark:bg-gray-800
                ${index % 2 ? 'mt-3' : ''}
                `}
              >
                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                  <Image src={url} alt={'Profile image'} layout="fill" placeholder="blur" blurDataURL={url} />
                </div>
              </div>
            ))}
          </div>
          <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-16 bg-gradient-to-b from-violet-50/50 via-violet-50/95 to-violet-50 dark:from-gray-900/30 dark:via-gray-900/95 dark:to-gray-900">
            <p className="text-xl font-semibold text-center text-violet-600 mb-2 dark:text-violet-500">
              {content.projects.heading.replace('0', usedByCount.toString())}
            </p>
            <Link href={content.projects.cta.url}>
              <a
                className="text-slate-500 hover:text-slate-700 text-center dark:text-slate-400 dark:hover:text-slate-300"
                rel="noreferrer"
              >
                {content.projects.cta.label}
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
