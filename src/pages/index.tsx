import type { InferGetStaticPropsType } from 'next'
import React from 'react'

import { defineStaticProps } from '../utils/next'
import { LandingPage } from '../components/LandingPage'
import { CodeSnippets, codeSnippets, type PreprocessedCodeSnippets } from '../components/LandingPage/HowItWorks'
import { ColorScheme, snippetToHtml } from '../utils/syntax-highlighting'
import { getUsedByCount } from '../utils/used-by-count'
import { promiseAllProperties, mapObjectValues } from '../utils/object'
import { useColorScheme } from '../components/ColorSchemeContext'

export const getStaticProps = defineStaticProps(async (_context) => {
  const { preprocessedCodeSnippets, usedByCount } = await promiseAllProperties({
    preprocessedCodeSnippets: promiseAllProperties<PreprocessedCodeSnippets>({
      light: htmlForCodeSnippets('light'),
      dark: htmlForCodeSnippets('dark'),
    }),
    usedByCount: getUsedByCount(),
  })

  return { props: { preprocessedCodeSnippets, usedByCount } }
})

const Page: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ preprocessedCodeSnippets, usedByCount }) => {
  const colorScheme = useColorScheme()

  return <LandingPage {...{ codeSnippets: preprocessedCodeSnippets[colorScheme], usedByCount }} />
}

export default Page

const htmlForCodeSnippets = (colorScheme: ColorScheme): Promise<CodeSnippets> =>
  promiseAllProperties(
    mapObjectValues(
      codeSnippets,
      (_key, snippets) =>
        Promise.all(
          snippets.map(({ content, file, lines }) =>
            snippetToHtml(content, colorScheme).then((_) => ({ file, lines, content: _ })),
          ),
        ) as any, // TODO: fix type
    ),
  )