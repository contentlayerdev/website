import { FC, Fragment, useState, useEffect } from 'react'
import { TreeRoot } from '../pages/docs/[[...slug]]'
import Link from 'next/link'
import { DocsNavigation } from './DocsNavigation'
import { Icon } from './Icon'
import { useRouter } from 'next/router'

export const DocsHeader: FC<{ tree: TreeRoot; breadcrumbs: any[]; title: string }> = ({ tree, breadcrumbs, title }) => {
  const { asPath } = useRouter()
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    setOpen(false)
  }, [asPath])

  return (
    <header className="w-full space-y-2 border-b border-gray-200 p-8 px-4 dark:border-gray-800 md:px-8 lg:border-none lg:px-16">
      <ul className="flex items-center space-x-2 text-sm">
        {breadcrumbs.map(({ path, title }, index) => (
          <Fragment key={index}>
            {index < breadcrumbs.length - 1 && (
              <li className="flex items-center space-x-2">
                <Link href={path}>
                  <a className="inline whitespace-nowrap hover:text-slate-600 dark:hover:text-slate-300">{title}</a>
                </Link>
                <svg
                  className="h-2.5 text-slate-400 dark:text-slate-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z" />
                </svg>
              </li>
            )}
          </Fragment>
        ))}
      </ul>
      <h1 className="sr-only text-2xl font-semibold text-slate-800 dark:text-slate-200 md:text-3xl lg:not-sr-only lg:text-4xl">
        {title}
      </h1>

      <div className="lg:hidden">
        <button
          aria-label="Show docs navigation"
          onClick={() => setOpen(true)}
          className="flex space-x-2 text-left text-2xl font-semibold text-slate-800 dark:text-slate-200 md:space-x-3 md:text-3xl lg:text-4xl"
        >
          <span className="mt-1.5 inline-block w-4 flex-shrink-0 md:w-5">
            <Icon name="chevron-down" />
          </span>
          <span className="inline-block flex-shrink">{title}</span>
        </button>
        {open && (
          <div className="fixed inset-0 z-50 h-screen bg-gray-950/10 pb-20 backdrop-blur-lg backdrop-filter dark:bg-gray-950/50">
            <div className="absolute left-0 h-full divide-y divide-gray-200 overflow-y-scroll border-l border-gray-200 bg-white p-4 dark:divide-gray-800 dark:border-gray-800 dark:bg-gray-950">
              <div className="flex items-center justify-between pb-2">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Documentation</h2>
                <button
                  type="button"
                  aria-label="Close docs navigation"
                  onClick={() => setOpen(!open)}
                  className="flex h-8 w-8 items-center justify-end text-slate-600 dark:text-slate-300"
                >
                  <span className="inline-block w-4">
                    <Icon name="close" />
                  </span>
                </button>
              </div>
              <div className="pt-4">
                <DocsNavigation tree={tree} />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
