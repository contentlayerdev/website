import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export const Author: FC<{ name: string; handle: string; avatar: string }> = ({ name, handle, avatar }) => {
  return (
    <div className="flex space-x-4">
      <div className="flex-shrink-0">
        <div className="relative h-12 w-12 overflow-hidden rounded-full">
          <Image src={avatar} alt={name} layout="fill" placeholder="blur" blurDataURL={avatar} />
        </div>
      </div>
      <div className="not-prose leading-tight">
        <p className="mb-0 font-semibold text-slate-700 dark:text-slate-300">{name}</p>
        <Link href={'https://twitter.com/' + handle}>
          <a target="_blank" rel="noreferrer" className="text-sm text-slate-500 dark:text-slate-400">
            {'@' + handle}
          </a>
        </Link>
      </div>
    </div>
  )
}
