import { FC } from 'react'
import Markdown from 'markdown-to-jsx'
import Link from 'next/link'
import { Icon, IconName } from './Icon'
import { Label } from './Label'
import { Card } from './Card'
import { Heading } from './Heading'

const isExternalUrl = (link: string): boolean => !link.startsWith('/')

export const DocsCard: FC<{
  title: string
  icon?: IconName | null
  label?: string | null
  subtitle?: string | null
  children?: React.ReactChildren | null
  link?: { url: string; label: string }
}> = ({ title, icon, label, subtitle, children, link }) => {
  return (
    <div className="flex flex-col">
      <div
        className={`grow border border-gray-100 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900 
        ${link ? 'rounded-t-2xl border-b-0' : 'rounded-2xl'} ${icon ? 'mt-4' : 'mt-0'}`}
      >
        {icon && (
          <div className="-mt-8 mb-4 h-12 w-12 rounded-full border border-violet-200 bg-violet-100 p-2 text-violet-600 dark:border-violet-900 dark:bg-violet-900/50 dark:text-violet-500">
            <Icon name={icon} />
          </div>
        )}
        <Heading level={3} className="mt-0">
          {title}
        </Heading>
        {label && <Label text={label} />}
        {subtitle && (
          <div className="text-sm text-slate-500 dark:text-slate-400">
            <Markdown>{subtitle}</Markdown>
          </div>
        )}
        {children && <div className="text-sm">{children}</div>}
      </div>
      {link && (
        <div className="not-prose rounded-b-2xl border border-violet-100 bg-violet-50 p-6">
          <Link href={link.url}>
            <a
              target={isExternalUrl(link.url) ? '_blank' : undefined}
              rel={isExternalUrl(link.url) ? 'noreferrer' : undefined}
              className="flex items-center space-x-2 font-semibold text-violet-600 hover:text-violet-700"
            >
              <span>{link.label}</span>
              <span className="block w-2">
                <Icon name="chevron-right" />
              </span>
            </a>
          </Link>
        </div>
      )}
    </div>
  )
}
