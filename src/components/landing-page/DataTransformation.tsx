import Image from 'next/image'
import { FC } from 'react'
import { Arrow } from '../common/Arrow'
import { FileTree } from './FileTree'

export const DataTransformation: FC<{ from: { type: string; data: any }; to: { type: string; data: any } }> = ({
  from,
  to,
}) => {
  return (
    <div>
      <Arrow
        type="curved-long"
        className="mx-auto mb-4 hidden w-40 text-slate-300 dark:text-slate-700 sm:block md:hidden lg:block"
      />
      <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 md:flex-col md:space-y-4 md:space-x-0 lg:flex-row lg:space-y-0 lg:space-x-4">
        {from.type == 'image' && (
          <div>
            <Image
              src={from.data.url}
              alt={from.data.alt}
              width={from.data.width}
              height={from.data.height}
              placeholder="blur"
              blurDataURL={from.data.url}
            />
          </div>
        )}
        {from.type == 'fileTree' && <FileTree contents={from.data} />}
        <div className="w-full sm:hidden md:block lg:hidden">
          <Arrow
            type="straight-short"
            className="mx-auto w-24 rotate-90 scale-y-[-1] py-6 text-slate-300 dark:text-slate-700"
          />
        </div>
        {to.type == 'image' && (
          <div>
            <Image
              src={to.data.url}
              alt={to.data.alt}
              width={to.data.width}
              height={to.data.height}
              placeholder="blur"
              blurDataURL={to.data.url}
            />
          </div>
        )}
        {to.type == 'fileTree' && <FileTree contents={to.data} />}
      </div>
    </div>
  )
}
