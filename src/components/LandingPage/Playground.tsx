import { FC, useEffect, useRef, useState } from 'react'
import { type VM } from '@stackblitz/sdk/typings/VM'
import stackblitz from '@stackblitz/sdk'

export const Playground: FC = () => {
  const ref = useRef<HTMLDivElement>(null)

  const [vm, setVm] = useState<VM | undefined>(undefined)

  const [currentFiles, setCurrentFiles] = useState(['posts/post-01.md'])

  console.log(vm)

  useEffect(() => {
    if (ref.current) {
      stackblitz
        .embedGithubProject(ref.current, 'contentlayerdev/next-contentlayer-example/tree/stackblitz-demo', {
          height: 800,
          openFile: currentFiles,
        })
        .then((_) => setVm(_))
    }
  }, [ref])

  return (
    <div className="h-[800px] my-8 relative mx-[-50vw] right-1/2 left-1/2 w-screen px-5">
      <div onClick={() => vm?.editor.openFile('.contentlayer/generated/index.d.ts')}>Generated file</div>
      <div onClick={() => vm?.editor.openFile('posts/post-01.md')}>Open post 1</div>
      <div onClick={() => vm?.editor.openFile('posts/post-02.md')}>Open post 2</div>
      {/* <div onClick={() => setCurrentFiles(['posts/post-01.md', 'posts/post-02.md'])}>Open post 1 + 2</div> */}
      <div ref={ref} />
      {/* <iframe
        className="w-full h-full"
        src="https://stackblitz.com/github/contentlayerdev/next-contentlayer-example/tree/stackblitz-demo?devtoolsheight=33&embed=1&file=posts/post-01.md&file=pages/index.jsx"
      /> */}
    </div>
  )
}
