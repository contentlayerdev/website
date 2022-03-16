import Image from 'next/image'
import { FC } from 'react'
import { Arrow } from '../Arrow'
import { FileTree } from '../FileTree'

export const DataTransformation: FC<{ from: { type: string; data: any }; to: { type: string; data: any } }> = ({
  from,
  to,
}) => {
  return (
    <div>
      <Arrow
        type="curved-long"
        className="hidden sm:block md:hidden lg:block w-40 mx-auto mb-4 text-slate-300 dark:text-slate-700"
      />
      <div className="flex justify-center flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 md:flex-col md:space-y-4 md:space-x-0 lg:flex-row lg:space-y-0 lg:space-x-4">
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
        <div className="sm:hidden md:block lg:hidden w-full">
          <Arrow
            type="straight-short"
            className="w-24 mx-auto py-6 text-slate-300 dark:text-slate-700 rotate-90 scale-y-[-1]"
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
