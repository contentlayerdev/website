import { FC, useState } from 'react'
import { CodeSnippets } from './LandingPage/HowItWorks'

export const CodeWindow: FC<{
  snippets: CodeSnippets
  ids: number[]
}> = ({ snippets, ids }) => {
  const [selectedFile, setSelectedFile] = useState(ids[0])
  return (
    <div>
      {/* TODO: Window layout & file tabs */}
      <div className="max-w-xl" style={{ fontSize: 13 }}>
        <div dangerouslySetInnerHTML={{ __html: snippets[selectedFile].content }} />
      </div>
    </div>
  )
}
