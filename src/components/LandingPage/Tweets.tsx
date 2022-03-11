import { FC } from 'react'
import { User } from '../User'

const content = {
  tweets: [
    {
      text: 'Having type-safe access to my content has been extremely helpful. Contentlayer provides a nice abstraction between your Markdown files or CMS and your application.',
      user: {
        name: 'Lee Robinson',
        position: 'Developer Relations at Vercel',
        avatar: 'https://pbs.twimg.com/profile_images/1194080814688079872/6qhYKGKC_400x400.jpg',
      },
    },
    {
      text: 'I’m using Contentlayer on my own website and it just works. No going back. Finally it’s easy to use content in my apps.',
      user: {
        name: 'Pedro Duarte',
        position: 'Creator of Radix UI',
        avatar: 'https://avatars.githubusercontent.com/u/372831?v=4',
      },
    },
    {
      text: 'I’m not using Contentlayer yet but I’m sure it’s great. Very excited about it in any case.',
      user: {
        name: 'Brian Lovin',
        position: 'Staff Designer at GitHub',
        avatar: 'https://pbs.twimg.com/profile_images/1217652661962661888/WfiUNjzP_400x400.jpg',
      },
    },
    {
      text: 'I’m using Contentlayer on my own website and it just works. No going back.',
      user: {
        name: 'Johannes Schickling',
        position: 'Founder of Prisma',
        avatar: 'https://pbs.twimg.com/profile_images/1452580365156208644/MSsWd3oT_400x400.jpg',
      },
    },
  ],
}

export const Tweets: FC = () => {
  return (
    <div className="relative w-full mt-16 md:mt-24 overflow-x-hidden">
      <ul className="list-none m-0 space-y-8 md:space-y-0 md:flex md:animate-scroll">
        {[...content.tweets, ...content.tweets].map(({ text, user }, index) => (
          <li
            key={index}
            className={`md:w-[560px] shrink-0 grow-0 px-4 ${
              index >= content.tweets.length ? 'hidden md:block' : 'block'
            }`}
          >
            <div className="h-full bg-gray-50/50 border border-gray-100 rounded-2xl p-8 space-y-4 dark:bg-gray-900/25 dark:border-gray-900">
              <User {...user} />
              <p className="text-slate-500 font-light italic dark:text-slate-400">
                <q>{text}</q>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
