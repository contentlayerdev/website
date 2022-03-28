import { FC } from 'react'
import Markdown from 'markdown-to-jsx'
import Link from 'next/link'
import { Icon, IconName } from './Icon'
import { Label } from './Label'
import { Card } from './Card'
import { Heading } from './Heading'

export const DocsCard: FC<{
  title: string
  icon?: IconName | null
  label?: string | null
  subtitle?: string | null
  children?: React.ReactChildren | null
  link?: { url: string }
}> = ({ title, icon, label, subtitle, children, link }) => {
  if (link) {
    return (
      <Card>
        <Link href={link.url}>
          <a className="block">
            <CardBody {...{ title, icon, label, subtitle, children }} />
          </a>
        </Link>
      </Card>
    )
  } else {
    return (
      <Card>
        <CardBody {...{ title, icon, label, subtitle, children }} />
      </Card>
    )
  }
}

const CardBody: FC<{
  title: string
  icon?: IconName | null
  label?: string | null
  subtitle?: string | null
  children?: React.ReactChildren | null
}> = ({ title, icon, label, subtitle, children }) => (
  <div className="not-prose space-y-4 p-4 md:px-6">
    <div className="space-y-2">
      <div className="flex items-center space-x-2.5">
        {icon && (
          <span className="inline-block w-6 text-slate-400 dark:text-slate-500">
            <Icon name={icon} />
          </span>
        )}
        <Heading level={3}>{title}</Heading>
      </div>
      {label && <Label text={label} />}
      {subtitle && (
        <div className="text-sm text-slate-500 dark:text-slate-400">
          <Markdown>{subtitle}</Markdown>
        </div>
      )}
    </div>
    {children && <div className="space-y-2 text-sm text-slate-500 dark:text-slate-400">{children}</div>}
  </div>
)
