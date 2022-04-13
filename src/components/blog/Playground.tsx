import { FC, useState, useEffect, useRef } from 'react'
import { type VM } from '@stackblitz/sdk/typings/VM'
import stackblitz from '@stackblitz/sdk'

export const Playground: FC<{ githubRepo: string; openFile?: string | '' }> = ({ githubRepo, openFile }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [vm, setVm] = useState<VM | undefined>(undefined)
  useEffect(() => {
    if (ref.current) {
      stackblitz
        .embedGithubProject(ref.current, 'contentlayerdev/next-contentlayer-example/tree/stackblitz-demo', {
          height: 700,
          openFile: openFile,
        })
        .then((_) => setVm(_))
    }
  }, [ref, openFile])

  return (
    <div className="mt-8 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-900">
      <div className="h-[700px] w-full" ref={ref} />
    </div>
  )
}
