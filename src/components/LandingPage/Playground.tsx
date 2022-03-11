import { FC, useEffect, useRef, useState } from 'react'
import { type VM } from '@stackblitz/sdk/typings/VM'
import stackblitz from '@stackblitz/sdk'
import Image from 'next/image'

const content = {
  heading: 'Give Contentlayer a try – right here',
  steps: [
    { step: 1, label: "Let's edit some content", file: 'posts/post-01.md' },
    { step: 2, label: 'How content is transformed into data', file: 'posts/post-01.md' },
    { step: 3, label: 'How data is used from your app', file: 'pages/posts/[slug].jsx' },
    { step: 4, label: 'Project setup', file: 'contentlayer.config.js' },
  ],
}

export const Playground: FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [vm, setVm] = useState<VM | undefined>(undefined)
  const [currentFiles, setCurrentFiles] = useState(['posts/post-01.md'])
  const [selectedStep, setSelectedStep] = useState(1)

  useEffect(() => {
    if (ref.current) {
      stackblitz
        .embedGithubProject(ref.current, 'contentlayerdev/next-contentlayer-example/tree/stackblitz-demo', {
          height: 700,
          openFile: currentFiles,
        })
        .then((_) => setVm(_))
    }
  }, [ref, currentFiles])

  return (
    <div className="hidden md:block bg-gray-950 mt-24 lg:mt-32">
      <div className="w-full max-w-screen-xl mx-auto px-4 md:px-8 py-24 lg:py-32 dark:pt-0">
        <h2 className="font-semibold text-3xl text-slate-200 text-center mb-16 mt-0">{content.heading}</h2>
        <div className="flex flex-wrap justify-center mb-4">
          {content.steps.map(({ step, label, file }, index) => (
            <button
              key={index}
              type="button"
              aria-label={label}
              onClick={() => {
                setSelectedStep(step)
                vm?.editor.openFile(file)
              }}
              className={`m-2 px-6 py-2 flex justify-center items-center rounded-md border font-medium focus:outline-none focus:ring-2 focus:ring-violet-900 ${
                step == selectedStep
                  ? 'text-violet-500 border-violet-900 bg-violet-600/20'
                  : 'text-slate-300 border-gray-800 hover:bg-gray-800 bg-gray-900'
              }`}
            >
              <span>{step}. </span>
              <span>{label}</span>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 mb-4">
          <div className="px-8">
            <Image src="/images/playground-hint-edit.png" width="550" height="75" className="opacity-50" />
          </div>
          <div className="px-8">
            <Image src="/images/playground-hint-updates.png" width="550" height="75" className="opacity-50" />
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl bg-gray-900 border border-gray-800 shadow-gray-900">
          <div className="h-10 shrink-0 grow-0 flex items-center px-4 space-x-1.5 border-b border-gray-900">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-amber-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
            <h3 className="w-full text-center font-normal text-slate-500 leading-none m-0 text-sm">
              Contentlayer Playground
            </h3>
          </div>
          <div className="overflow-hidden">
            <div className="-mt-10">
              <div className="h-[700px] w-full" ref={ref} />
            </div>
          </div>
        </div>
        <div className="mt-4 px-8 flex justify-end">
          <Image src="/images/playground-hint-dev-server.png" width="627" height="55" className="opacity-50" />
        </div>
      </div>
    </div>
  )
}
