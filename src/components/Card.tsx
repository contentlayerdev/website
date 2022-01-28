import { FC } from 'react'
import Markdown from 'markdown-to-jsx'
import Link from 'next/link'

export const Card: FC<{ title: string; body?: string; link?: { label: string; url: string } }> = ({
  title,
  body,
  link,
}) => {
  return (
    <div className="border p-4 rounded-md border-gray-500">
      <h2 className="m-0 mb-2 text-xl">{title}</h2>
      {body && (
        <div className="text-sm">
          <Markdown>{body}</Markdown>
        </div>
      )}
      {link?.label && link?.url && (
        <Link href={link.url}>
          <a className="inline-block mt-4">{link.label}</a>
        </Link>
      )}
    </div>
  )
}
