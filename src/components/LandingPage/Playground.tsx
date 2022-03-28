import { FC, useEffect, useRef, useState } from 'react'
import { type VM } from '@stackblitz/sdk/typings/VM'
import stackblitz from '@stackblitz/sdk'
import { Arrow } from '../Arrow'
import { Card } from '../Card'
import { Heading } from '../Heading'

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
      file: '.contentlayer/generated/Post/post-01.md.json',
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
  const [currentFiles, setCurrentFiles] = useState(['posts/change-me.md'])
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
    <div className="mt-24 hidden bg-gray-950 dark:mt-0 md:block lg:mt-32 dark:lg:mt-0">
      <div className="mx-auto w-full max-w-screen-xl space-y-8 px-4 py-24 dark:pt-0 md:px-8 lg:py-32">
        <Heading level={2} className="text-center text-slate-200">
          {content.heading}
        </Heading>
        <div className="flex flex-wrap justify-center">
          {content.steps.map(({ label, file }, index) => (
            <button
              key={index}
              type="button"
              aria-label={label}
              onClick={() => {
                setSelectedStep(index)
                vm?.editor.openFile(file)
              }}
              className={`m-2 flex items-center justify-center rounded-md border px-6 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-violet-900 ${
                index == selectedStep
                  ? 'border-violet-900 bg-violet-600/20 text-violet-500'
                  : 'border-gray-800 bg-gray-900 text-slate-300 hover:bg-gray-800'
              }`}
            >
              <span>{`${index + 1}. `}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2">
          <div className="px-8">
            {content.steps[selectedStep].hints?.editor && (
              <div className="flex space-x-4">
                <p className="pt-2 font-handwritten text-slate-600 lg:text-lg">
                  {content.steps[selectedStep].hints?.editor}
                </p>
                <Arrow type="curved-short" className="w-16 shrink-0 text-slate-700 lg:w-24" />
              </div>
            )}
          </div>
          <div className="px-8">
            {content.steps[selectedStep].hints?.preview && (
              <div className="mb-2 flex space-x-4">
                <p className="pt-2 font-handwritten text-slate-600 lg:text-lg">
                  {content.steps[selectedStep].hints?.preview}
                </p>
                <Arrow type="looped-long" className="mt-2 w-28 shrink-0 rotate-12 text-slate-700 lg:w-40" />
              </div>
            )}
          </div>
        </div>
        <Card shadow dark>
          <div className="flex h-10 shrink-0 grow-0 items-center space-x-1.5 border-b border-gray-900 px-4">
            <span className="h-3 w-3 rounded-full bg-slate-600" />
            <span className="h-3 w-3 rounded-full bg-slate-600" />
            <span className="h-3 w-3 rounded-full bg-slate-600" />
            <h3 className="m-0 w-full text-center text-sm font-normal leading-none text-slate-500">
              Contentlayer Playground
            </h3>
          </div>
          <div className="overflow-hidden">
            <div className="-mt-10">
              <div className="h-[700px] w-full" ref={ref} />
            </div>
          </div>
        </Card>
        <div className="px-8">
          {content.steps[selectedStep].hints?.console && (
            <div className="flex items-start space-x-4 pl-48 lg:pl-96">
              <Arrow type="straight-dashed" className="w-32 shrink-0 rotate-180 text-slate-700 lg:w-40" />
              <p className="pt-5 font-handwritten text-slate-600 lg:text-lg">
                {content.steps[selectedStep].hints?.console}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
