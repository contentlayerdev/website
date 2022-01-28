import { FC } from 'react'
import Markdown from 'markdown-to-jsx'

export const Callout: FC = ({ children }) => {
  const markdownContent: string = children?.toString() ?? ''

  return (
    <div className="mb-4 border-l-4 border-blue-400 p-4 bg-gray-800 rounded-sm">
      <Markdown>{markdownContent}</Markdown>
    </div>
  )
}
