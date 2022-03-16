import { FC, useEffect, useRef, useState } from 'react'
import { type VM } from '@stackblitz/sdk/typings/VM'
import stackblitz from '@stackblitz/sdk'
import { Arrow } from '../Arrow'

const content = {
  heading: 'Give Contentlayer a try – right here',
  steps: [
    {
      label: "Let's edit some content",
      file: 'posts/post-01.md',
      hints: {
        editor: 'Try to edit some of the content below...',
        preview: '... the changes will update in real-time',
        console: 'Contentlayer runs as part of the Next.js dev server',
      },
    },
    {
      label: 'How content is transformed into data',
      file: 'posts/post-01.md',
      hints: {
        editor: 'Try to edit some of the content below...',
        preview: '... the changes will update in real-time',
        console: 'Contentlayer runs as part of the Next.js dev server',
      },
    },
    {
      label: 'How data is used from your app',
      file: 'pages/posts/[slug].jsx',
      hints: {
        editor: 'Try to edit some of the content below...',
        preview: '... the changes will update in real-time',
        console: 'Contentlayer runs as part of the Next.js dev server',
      },
    },
    {
      label: 'Project setup',
      file: 'contentlayer.config.js',
      hints: {
        editor: 'Try to edit some of the content below...',
        preview: '... the changes will update in real-time',
        console: 'Contentlayer runs as part of the Next.js dev server',
      },
    },
  ],
}

export const Playground: FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [vm, setVm] = useState<VM | undefined>(undefined)
  const [currentFiles, setCurrentFiles] = useState(['posts/post-01.md'])
  const [selectedStep, setSelectedStep] = useState(0)

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
    <div className="hidden md:block bg-gray-950 mt-24 lg:mt-32 dark:mt-0 dark:lg:mt-0">
      <div className="w-full max-w-screen-xl mx-auto px-4 md:px-8 py-24 lg:py-32 dark:pt-0">
        <h2 className="font-semibold text-3xl text-slate-200 text-center mb-16 mt-0">{content.heading}</h2>
        <div className="flex flex-wrap justify-center mb-8">
          {content.steps.map(({ label, file }, index) => (
            <button
              key={index}
              type="button"
              aria-label={label}
              onClick={() => {
                setSelectedStep(index)
                vm?.editor.openFile(file)
              }}
              className={`m-2 px-6 py-2 flex justify-center items-center rounded-md border font-medium focus:outline-none focus:ring-2 focus:ring-violet-900 ${
                index == selectedStep
                  ? 'text-violet-500 border-violet-900 bg-violet-600/20'
                  : 'text-slate-300 border-gray-800 hover:bg-gray-800 bg-gray-900'
              }`}
            >
              <span>{`${index + 1}. `}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 mb-4">
          <div className="px-8">
            {content.steps[selectedStep].hints?.editor && (
              <div className="flex space-x-4">
                <p className="font-handwritten lg:text-lg text-slate-600 pt-2">
                  {content.steps[selectedStep].hints?.editor}
                </p>
                <Arrow type="curved-short" className="shrink-0 w-16 lg:w-24 text-slate-700" />
              </div>
            )}
          </div>
          <div className="px-8">
            {content.steps[selectedStep].hints?.preview && (
              <div className="flex space-x-4 mb-2">
                <p className="font-handwritten lg:text-lg text-slate-600 pt-2">
                  {content.steps[selectedStep].hints?.preview}
                </p>
                <Arrow type="looped-long" className="shrink-0 w-28 lg:w-40 text-slate-700 rotate-12 mt-2" />
              </div>
            )}
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl bg-gray-900 border border-gray-800 shadow-gray-900">
          <div className="h-10 shrink-0 grow-0 flex items-center px-4 space-x-1.5 border-b border-gray-900">
            <span className="w-3 h-3 rounded-full bg-slate-600" />
            <span className="w-3 h-3 rounded-full bg-slate-600" />
            <span className="w-3 h-3 rounded-full bg-slate-600" />
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
        <div className="mt-8 px-8">
          {content.steps[selectedStep].hints?.console && (
            <div className="flex items-start space-x-4 pl-48 lg:pl-96">
              <Arrow type="straight-dashed" className="shrink-0 w-32 lg:w-40 text-slate-700 rotate-180" />
              <p className="font-handwritten lg:text-lg text-slate-600 pt-5">
                {content.steps[selectedStep].hints?.console}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
