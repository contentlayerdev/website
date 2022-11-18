import { FC, useState } from 'react'
import Link from 'next/link'
import { User } from '../common/User'
import { Button } from '../common/Button'
import { Card } from '../common/Card'

export type TweetData = {
  text: string
  url: string
  person: TweetDataPerson
}

export type TweetDataPerson = {
  name: string
  avatar: string
  bio: string
}

const tweets: TweetData[] = [
  {
    text: 'Having type-safe access to my content has been extremely helpful. Contentlayer provides a nice abstraction between your Markdown files or CMS and your application.',
    person: {
      name: 'Lee Robinson',
      bio: 'Developer Relations at Vercel',
      avatar: 'https://pbs.twimg.com/profile_images/1587647097670467584/adWRdqQ6_400x400.jpg',
    },
    url: 'https://twitter.com/leeerob',
  },
  {
    text: `Been using Contentlayer as the mdx processor for the Rainbow docs. Such a pleasant experience 🧘‍♂️

It transforms the mdx files, validates them AND adds types!`,
    person: {
      name: 'Pedro Duarte',
      bio: 'Creator of Radix UI',
      avatar: 'https://pbs.twimg.com/media/FC9arX6XEAYZ9eE?format=jpg&name=large',
    },
    url: 'https://twitter.com/peduarte/status/1514688181278580738',
  },
  {
    text: `Contentlayer looks like a super promising library [...] to import data from CMS platforms or local files like markdown into your application.

Took me less than 5 minutes to cleanly separate and connect MDX files to a Next.js layout.`,
    person: {
      name: 'Houssein Djirdeh',
      bio: 'Software Engineer at Google',
      avatar: 'https://pbs.twimg.com/profile_images/1460651862340915201/w8Zva6LO_400x400.jpg',
    },
    url: 'https://twitter.com/hdjirdeh/status/1483047963316260870',
  },
  {
    text: `If you bring content-as-data into your website, whether it's from Markdown files or a hosted CMS, do yourself a favour and check this out.

    Massive leap forward in speed, type safety, and DX 👏🏻`,
    person: {
      name: 'Jed Watson',
      bio: 'Co-founder of Thinkmill',
      avatar: 'https://pbs.twimg.com/profile_images/694401960397570049/uIEsJzcv_400x400.jpg',
    },
    url: 'https://twitter.com/JedWatson/status/1517130123463454721',
  },
  {
    text: `We're using Contentlayer on the @GraphCMS documentation, and it's fantastic! It not only loads all the local content, but it also supports MDX. Plus, having type definitions for the content is super helpful.`,
    person: {
      name: 'João Pedro Schmitz',
      bio: 'Front-End Engineer at GraphCMS',
      avatar: 'https://pbs.twimg.com/profile_images/1425192858412326912/dh_udEMJ_400x400.jpg',
    },
    url: 'https://twitter.com/jpedroschmitz/status/1514655711535546375',
  },
]

const Tweet: FC<TweetData> = ({ text, person, url }) => {
  return (
    <Link href={url}>
      <a className="block h-full" rel="noreferrer" target="_blank">
        <Card className="h-full space-y-4 p-8">
          <User {...person} />
          <p className="font-light italic text-slate-500 dark:text-slate-400">
            <q>{text}</q>
          </p>
        </Card>
      </a>
    </Link>
  )
}

export const Tweets: FC = ({}) => {
  const [tweetsToShow, setTweetsToShow] = useState<number>(2)
  return (
    <div className="relative my-16 w-full overflow-x-hidden md:my-24 lg:my-32">
      <ul className="md:animate-scroll m-0 hidden list-none space-y-8 md:flex md:space-y-0">
        {[...tweets, ...tweets, ...tweets].map((tweet, index) => (
          <li
            key={index}
            className={`m-0 shrink-0 grow-0 px-4 md:w-[560px] ${index >= tweets.length ? 'hidden md:block' : 'block'}`}
          >
            <Tweet {...tweet} />
          </li>
        ))}
      </ul>
      <div className="md:hidden">
        <ul className="md:animate-scroll m-0 list-none space-y-8 md:space-y-0">
          {tweets.slice(0, tweetsToShow).map((tweet, index) => (
            <li
              key={index}
              className={`shrink-0 grow-0 px-4 md:w-[560px] ${index >= tweets.length ? 'hidden md:block' : 'block'}`}
            >
              <Tweet {...tweet} />
            </li>
          ))}
        </ul>
        {tweetsToShow < tweets.length && (
          <div className="flex w-full justify-center px-4 pt-8">
            <Button label="Show more" action={() => setTweetsToShow(tweetsToShow + 2)} theme="primary" />
          </div>
        )}
      </div>
    </div>
  )
}
