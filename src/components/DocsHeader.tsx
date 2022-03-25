import { FC, Fragment, useState } from 'react'
import { TreeRoot } from '../pages/docs/[[...slug]]'
import Link from 'next/link'

export const DocsHeader: FC<{ tree: TreeRoot; breadcrumbs: any[]; title: string }> = ({ tree, breadcrumbs, title }) => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <header className="w-full border-b border-gray-200 px-16 py-8 dark:border-gray-800 md:border-none">
      <ul className="flex items-center space-x-2 text-sm">
        {breadcrumbs.map(({ path, title }, index) => (
          <Fragment key={index}>
            {index < breadcrumbs.length - 1 && (
              <li className="flex items-center space-x-2">
                <Link href={path}>
                  <a className="inline hover:text-slate-600 dark:hover:text-slate-300">{title}</a>
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
      <h1 className="text-4xl font-semibold text-slate-800 dark:text-slate-200">{title}</h1>
    </header>
  )
}
