import { FC, useState } from 'react'
import { type CodeSnippet } from './LandingPage/HowItWorks'

export const CodeWindow: FC<{
  snippets: readonly CodeSnippet[]
}> = ({ snippets }) => {
  const [selectedFileIndex, setSelectedFileIndex] = useState(0)

  return (
    <div>
      {/* TODO: Window layout & file tabs */}
      <div className="max-w-xl" style={{ fontSize: 13 }}>
        <div dangerouslySetInnerHTML={{ __html: snippets[selectedFileIndex].content }} />
      </div>
    </div>
  )
}
