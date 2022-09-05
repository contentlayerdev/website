import { FC, useEffect, useRef, useState } from 'react'
import stackblitz from '@stackblitz/sdk'
import type * as Stackblitz from '@stackblitz/sdk'
import { Arrow } from '../common/Arrow'
import { Card } from '../common/Card'
import { Heading } from './Heading'
import { arraysAreEqual } from '../../utils/helpers'
import classNames from 'classnames'

type Content = {
  heading: string
  steps: {
    label: string
    ideState: StackblitzIDEState
    hints: { editor: string; preview?: string; console: string }
  }[]
}

const content: Content = {
  heading: 'Give Contentlayer a try – right here',
  steps: [
    {
      label: "Let's edit some content",
      ideState: {
        openFiles: ['posts/change-me.md'],
        url: '/',
        view: 'default',
      },
      hints: {
        editor: 'Try to edit some of the content below...',
        preview: '... the changes will update in real-time',
        console: 'Contentlayer runs as part of the Next.js dev server',
      },
    },
    {
      label: 'How content is transformed into data',
      ideState: {
        openFiles: ['posts/change-me.md', '.contentlayer/generated/Post/change-me.md.json'],
        focusIndex: 1,
        url: '/',
        view: 'editor',
      },
      hints: {
        editor: 'Each content file (e.g. MDX) is transformed into a JSON document ...',
        preview: '... which are stored in the .contentlayer/generated folder',
        console: 'Contentlayer runs as part of the Next.js dev server',
      },
    },
    {
      label: 'How data is used from your app',
      ideState: {
        openFiles: ['pages/posts/[slug].tsx'],
        url: '/posts/change-me',
        view: 'default',
      },
      hints: {
        editor: 'Content is simply imported as data and used in your components',
        preview: '... and even supports live-reloading/HMR and tree-shaking',
        console: 'Contentlayer runs as part of the Next.js dev server',
      },
    },
    {
      label: 'Project setup',
      ideState: {
        openFiles: ['contentlayer.config.ts', 'next.config.js'],
        url: '/',
        view: 'editor',
      },
      hints: {
        editor: 'The Contentlayer config contains your document type definitions',
        preview: 'Seamless integration with Next.js',
        console: 'Contentlayer runs as part of the Next.js dev server',
      },
    },
  ],
}

export const Playground: FC = () => {
  const [selectedStep, setSelectedStep] = useState(0)

  const [stackblitzIDEState, setStackblitzIDEState] = useState<StackblitzIDEState>({
    openFiles: ['posts/change-me.md'],
    url: '',
    view: 'default',
  })

  const [editorIsReady, setEditorIsReady] = useState(false)

  return (
    <div id="playground" className="mt-24 hidden bg-gray-950 md:block lg:mt-32">
      <div className="mx-auto w-full max-w-screen-xl space-y-8 px-4 py-24 dark:pt-0 md:px-8 lg:py-32">
        <Heading level={2} className="text-center text-slate-200">
          {content.heading}
        </Heading>
        <div className="flex flex-wrap justify-center">
          {content.steps.map(({ label, ideState }, index) => (
            <button
              key={index}
              type="button"
              aria-label={label}
              onClick={(e) => {
                if (editorIsReady) {
                  setSelectedStep(index)
                  setStackblitzIDEState(ideState)
                } else {
                  e.preventDefault()
                }
              }}
              className={classNames(
                'm-2 flex items-center justify-center rounded-md border px-6 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-violet-900',
                editorIsReady ? 'cursor-pointer' : 'cursor-wait',
                index == selectedStep
                  ? 'border-violet-900 bg-violet-600/20 text-violet-500'
                  : 'border-gray-800 bg-gray-900 text-slate-300 hover:bg-gray-800',
              )}
            >
              {`${index + 1}. `}
              {label}
            </button>
          ))}
        </div>
        <div className="grid h-[68px] grid-cols-2">
          <div className="px-8">
            {content.steps[selectedStep].hints?.editor && (
              <div className="flex space-x-4">
                <p className="pt-2 font-handwritten text-slate-400 lg:text-lg">
                  {content.steps[selectedStep].hints?.editor}
                </p>
                <Arrow type="curved-short" className="w-16 shrink-0 text-slate-700 lg:w-24" />
              </div>
            )}
          </div>
          <div className="px-8">
            {content.steps[selectedStep].hints?.preview && (
              <div className="mb-2 flex space-x-4">
                <p className="pt-2 font-handwritten text-slate-400 lg:text-lg">
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
            <StackblitzIDE
              setEditorIsReady={setEditorIsReady}
              repoSlug="contentlayerdev/next-contentlayer-example"
              className="h-[700px] w-full"
              {...stackblitzIDEState}
            />
          </div>
        </Card>
        <div className="px-8">
          {content.steps[selectedStep].hints?.console && (
            <div className="flex items-start space-x-4 pl-48 lg:pl-96">
              <Arrow type="straight-dashed" className="w-32 shrink-0 rotate-180 text-slate-700 lg:w-40" />
              <p className="pt-5 font-handwritten text-slate-400 lg:text-lg">
                {content.steps[selectedStep].hints?.console}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

type NonNil<T> = T extends null | undefined ? never : T

type StackblitzIDEState = {
  openFiles: string[]
  focusIndex?: number
  url: string
  view: Stackblitz.UiViewOption
}

const StackblitzIDE: React.FC<
  {
    className?: string
    repoSlug: string
    setEditorIsReady: (_: boolean) => void
  } & StackblitzIDEState
> = ({ className, repoSlug, setEditorIsReady, openFiles, focusIndex, url, view }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [vm, setVm] = useState<Stackblitz.VM | undefined>(undefined)

  const [currentFiles, setCurrentFiles] = useState<string[]>(openFiles)
  const [currentView, setCurrentView] = useState<Stackblitz.OpenOptions['view']>(view)

  useEffect(() => {
    if (vm === undefined) return

    let timeout: number | undefined = undefined

    // TODO also poll for the website to be loaded
    // TODO use `getUrl` for that
    const check = async () => {
      const files = await vm.getFsSnapshot()
      const fileNames = Object.keys(files ?? {})
      if (fileNames.includes('.contentlayer/generated/Post/change-me.md.json')) {
        setEditorIsReady(true)
      } else {
        timeout = window.setTimeout(check, 50)
      }
    }

    check()

    return () => clearInterval(timeout)
  }, [vm, setEditorIsReady])

  useEffect(() => {
    if (vm && view !== 'editor') {
      // TODO fix in Stackblitz SDK
      vm.preview.getUrl().then(({ url: currentUrl }: any) => {
        if (currentUrl && !currentUrl.endsWith(url)) {
          vm.preview.setUrl(url)
        }
      })
    }
  }, [vm, view, url])

  useEffect(() => {
    if (vm && currentView !== view) {
      vm.editor.setView(view).then(() => setCurrentView(view))
    }
  }, [vm, currentView, view])

  useEffect(() => {
    if (vm && !arraysAreEqual(currentFiles, openFiles)) {
      vm.editor
        .openFile(openFiles)
        .then(() => vm.editor.setCurrentFile(openFiles[focusIndex ?? 0]))
        .then(() => setCurrentFiles(openFiles))
    }
  }, [vm, currentFiles, openFiles, focusIndex])

  useEffect(() => {
    if (ref.current && vm === undefined) {
      stackblitz
        .embedGithubProject(ref.current, repoSlug, {
          height: 700,
          openFile: openFiles,
          showSidebar: true,
          view,
          forceEmbedLayout: true,
        })
        .then((_) => setVm(_))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, vm, repoSlug])

  return <div className={className} ref={ref} />
}
