import { FC } from 'react'
import Image from 'next/image'

export const User: FC<{ name: string; position: string; avatar: string }> = ({ name, position, avatar }) => {
  return (
    <div className="flex space-x-4">
      <div className="flex-shrink-0">
        <div className="relative w-12 h-12 rounded-full overflow-hidden">
          <Image src={avatar} alt={name} layout="fill" placeholder="blur" blurDataURL={avatar} />
        </div>
      </div>
      <div>
        <p className="font-semibold text-slate-700 mb-0 dark:text-slate-300">{name}</p>
        <p className="text-slate-500 text-sm dark:text-slate-400">{position}</p>
      </div>
    </div>
  )
}
