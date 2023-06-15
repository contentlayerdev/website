import { allDocs, allExamples, allPosts } from 'contentlayer/generated'
import type { InferGetStaticPropsType } from 'next'
import React, { useEffect, useState } from 'react'
import { buildDocsTree } from 'src/utils/build-docs-tree'
import { useColorScheme } from '../components/ColorSchemeContext'
import { Container } from '../components/common/Container'
import { FAQ } from '../components/landing-page/FAQ'
import { Features } from '../components/landing-page/Features'
import { Hero } from '../components/landing-page/Hero'
import { codeSnippets, HowItWorks, type CodeSnippets } from '../components/landing-page/HowItWorks'
import { Playground } from '../components/landing-page/Playground'
import { Support } from '../components/landing-page/Support'
import { Testimonials } from '../components/landing-page/Testimonials'
import { Tweets } from '../components/landing-page/Tweets'
import { buildExamplesTree } from '../utils/build-examples-tree'
import { defineStaticProps } from '../utils/next'
import { mapObjectValues, promiseAllProperties } from '../utils/object'
import { ColorScheme, snippetToHtml } from '../utils/syntax-highlighting'
import { getUsedByCountWithFallback } from '../utils/used-by-count'

export const getStaticProps = defineStaticProps(async (_context) => {
  console.time('getStaticProps /')

  const { preprocessedCodeSnippets, usedByCount } = await promiseAllProperties({
    preprocessedCodeSnippets: promiseAllProperties<PreprocessedCodeSnippets>({
      light: htmlForCodeSnippets('light'),
      dark: htmlForCodeSnippets('dark'),
    }),
    usedByCount: getUsedByCountWithFallback(),
  })
  const docs = buildDocsTree(allDocs)
  const examples = buildExamplesTree(allExamples)
  const posts = allPosts

  console.timeEnd('getStaticProps /')

  return { props: { preprocessedCodeSnippets, usedByCount, docs, examples, posts } }
})

const Page: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ preprocessedCodeSnippets, usedByCount }) => {
  const preferredColorScheme = useColorScheme()
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    if (preferredColorScheme === 'system') {
      setColorScheme(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    } else {
      setColorScheme(preferredColorScheme)
    }
  }, [preferredColorScheme])

  return (
    <Container>
      <Hero />
      <Support />
      <Testimonials usedByCount={usedByCount} />
      <Features />
      <HowItWorks codeSnippets={preprocessedCodeSnippets[colorScheme]} />
      <Playground />
      <FAQ />
      <Tweets />
    </Container>
  )
}

export default Page

export type PreprocessedCodeSnippets = Record<ColorScheme, CodeSnippets>

export const htmlForCodeSnippets = (colorScheme: ColorScheme): Promise<CodeSnippets> =>
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
