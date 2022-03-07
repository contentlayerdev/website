import type { InferGetStaticPropsType } from 'next'
import React from 'react'

import { defineStaticProps } from '../utils/next'
import { LandingPage } from '../components/LandingPage'
import { type CodeSnippets, codeSnippets } from '../components/LandingPage/HowItWorks'
import { snippetToHtml } from '../utils/syntax-highlighting'

export const getStaticProps = defineStaticProps(async (context) => {
  const codeSnippetsHtml: CodeSnippets = {
    step1: {
      'contentlayer.config.ts': await snippetToHtml(codeSnippets.step1['contentlayer.config.ts']),
    },
    step3: {
      'pages/posts/[slug].tsx': await snippetToHtml(codeSnippets.step3['pages/posts/[slug].tsx']),
    },
  }

  return { props: { codeSnippetsHtml } }
})

const Page: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ codeSnippetsHtml }) => {
  return <LandingPage {...{ codeSnippetsHtml }} />
}

export default Page
