import React from 'react'
import { Header } from '../Header'
import { CodeSnippets } from './HowItWorks'
import { Playground } from './Playground'

export const LandingPage: React.FC<{ codeSnippetsHtml: CodeSnippets }> = ({ codeSnippetsHtml }) => {
  return (
    <div>
      <Header />
      <div className="h-full pt-[57px]">
        <div>Contentlayer</div>
        <div dangerouslySetInnerHTML={{ __html: codeSnippetsHtml.step1['contentlayer.config.ts'] }} />
        <div dangerouslySetInnerHTML={{ __html: codeSnippetsHtml.step3['pages/posts/[slug].tsx'] }} />
        <Playground />
      </div>
    </div>
  )
}
