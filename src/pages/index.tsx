import type { InferGetStaticPropsType } from 'next'
import React, { useEffect, useState } from 'react'
import { allDocs, allExamples, allPosts } from 'contentlayer/generated'
import { buildDocsTree } from 'src/utils/build-docs-tree'
import { defineStaticProps } from '../utils/next'
import { ColorScheme, snippetToHtml } from '../utils/syntax-highlighting'
import { getUsedByCountWithFallback } from '../utils/used-by-count'
import { promiseAllProperties, mapObjectValues } from '../utils/object'
import { useColorScheme } from '../components/ColorSchemeContext'
import { Hero } from '../components/landing-page/Hero'
import { Support } from '../components/landing-page/Support'
import { Testimonials } from '../components/landing-page/Testimonials'
import { Features } from '../components/landing-page/Features'
import { type CodeSnippets, HowItWorks, codeSnippets } from '../components/landing-page/HowItWorks'
import { FAQ } from '../components/landing-page/FAQ'
import { Tweets } from '../components/landing-page/Tweets'
import { Playground } from '../components/landing-page/Playground'
import { Container } from '../components/common/Container'
import { buildExamplesTree } from '../utils/build-examples-tree'

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
