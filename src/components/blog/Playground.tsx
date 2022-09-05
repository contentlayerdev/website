import { FC, useState, useEffect, useRef } from 'react'
import stackblitz, { type VM } from '@stackblitz/sdk'

export const Playground: FC<{ githubRepo: string; openFile?: string | '' }> = ({ githubRepo, openFile }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [vm, setVm] = useState<VM | undefined>(undefined)

  useEffect(() => {
    if (ref.current && vm === undefined) {
      stackblitz
        .embedGithubProject(ref.current, 'contentlayerdev/next-contentlayer-example', {
          height: 700,
          showSidebar: true,
          openFile: openFile,
        })
        .then((_) => setVm(_))
    }
  }, [ref, openFile, vm])

  return (
    <div className="mt-8 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-900">
      <div className="h-[700px] w-full" ref={ref} />
    </div>
  )
}
