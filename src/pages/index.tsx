import type { InferGetStaticPropsType } from 'next'
import React from 'react'

import { defineStaticProps } from '../utils/next'
import { LandingPage } from '../components/LandingPage'
import { type CodeSnippets, codeSnippets } from '../components/LandingPage/HowItWorks'
import { snippetToHtml } from '../utils/syntax-highlighting'
import { getUsedByCount } from 'src/utils/used-by-count'

export const getStaticProps = defineStaticProps(async (context) => {
  let codeSnippetsHtml = []
  for (let snippet of codeSnippets) {
    const html = await snippetToHtml(snippet.content)
    codeSnippetsHtml.push({
      file: snippet.file,
      content: html,
    })
  }

  const usedByCount = await getUsedByCount()

  return { props: { codeSnippetsHtml, usedByCount } }
})

const Page: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ codeSnippetsHtml, usedByCount }) => {
  return <LandingPage {...{ codeSnippetsHtml, usedByCount }} />
}

export default Page
