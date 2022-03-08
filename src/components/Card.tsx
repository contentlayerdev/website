import { FC } from 'react'
import Markdown from 'markdown-to-jsx'
import Link from 'next/link'

import { Icon, IconName } from './Icon'
import { Label } from './Label'

export const Card: FC<{
  title: string
  icon?: IconName | null
  label?: string | null
  subtitle?: string | null
  children?: React.ReactChildren | null
  link?: { url: string }
}> = ({ title, icon, label, subtitle, children, link }) => {
  const cardBody = <CardBody {...{ title, icon, label, subtitle, children }} />
  if (link) {
    return (
      <Link href={link.url}>
        <a className="!text-gray-800 dark:!text-gray-100 !border-0 hover:bg-gray-50 hover:dark:bg-gray-850 flex">
          {cardBody}
        </a>
      </Link>
    )
  }

  return cardBody
}

const CardBody: FC<{
  title: string
  icon?: IconName | null
  label?: string | null
  subtitle?: string | null
  children?: React.ReactChildren | null
}> = ({ title, icon, label, subtitle, children }) => (
  <div className="border p-4 rounded-md border-gray-500 w-full">
    <h2 className="m-0 mb-2 text-xl flex items-center">
      {icon && (
        <span className="w-6 inline-block mr-2">
          <Icon name={icon} />
        </span>
      )}
      {title}{' '}
      {label && (
        <span className="inline-block ml-2">
          <Label text={label} />
        </span>
      )}
    </h2>
    {subtitle && (
      <div className="text-sm">
        <Markdown>{subtitle}</Markdown>
      </div>
    )}
    {children && <div className="text-sm">{children}</div>}
  </div>
)
