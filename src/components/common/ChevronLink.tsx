import { FC } from 'react'
import Link from 'next/link'
import { Icon } from './Icon'

const isExternalUrl = (link: string): boolean => !link.startsWith('/')

export const ChevronLink: FC<{ label: string; url: string }> = ({ label, url }) => {
  if (isExternalUrl(url)) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center space-x-1.5 text-violet-600 no-underline hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
      >
        <span className="font-semibold">{label}</span>
        <span className="block w-2">
          <Icon name="chevron-right" />
        </span>
      </a>
    )
  } else {
    return (
      <Link href={url}>
        <a className="inline-flex items-center space-x-1.5 text-violet-600 no-underline hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300">
          <span className="font-semibold">{label}</span>
          <span className="block w-2">
            <Icon name="chevron-right" />
          </span>
        </a>
      </Link>
    )
  }
}
