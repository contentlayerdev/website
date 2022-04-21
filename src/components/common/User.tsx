import { FC } from 'react'
import Image from 'next/image'

export const User: FC<{ name: string; bio: string; avatar: string }> = ({ name, bio, avatar }) => {
  return (
    <div className="flex space-x-4">
      <div className="flex-shrink-0">
        <div className="relative h-12 w-12 overflow-hidden rounded-full">
          <Image src={avatar} alt={name} layout="fill" placeholder="blur" blurDataURL={avatar} />
        </div>
      </div>
      <div>
        <p className="mb-0 font-semibold text-slate-700 dark:text-slate-300">{name}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">{bio}</p>
      </div>
    </div>
  )
}
