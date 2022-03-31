import type { InferGetStaticPropsType } from 'next'
import React from 'react'
import { allDocs } from 'contentlayer/generated'
import { buildTree } from 'src/utils/build-tree'
import { defineStaticProps } from '../utils/next'
import { ColorScheme, snippetToHtml } from '../utils/syntax-highlighting'
import { getUsedByCount } from '../utils/used-by-count'
import { promiseAllProperties, mapObjectValues } from '../utils/object'
import { useColorScheme } from '../components/ColorSchemeContext'
import { Hero } from '../components/LandingPage/Hero'
import { Support } from '../components/LandingPage/Support'
import { Testimonials } from '../components/LandingPage/Testimonials'
import { Features } from '../components/LandingPage/Features'
import { type CodeSnippets, HowItWorks, codeSnippets } from '../components/LandingPage/HowItWorks'
import { FAQ } from '../components/LandingPage/FAQ'
import { Tweets } from '../components/LandingPage/Tweets'
import { Playground } from '../components/LandingPage/Playground'
import { Container } from '../components/Container'
import { PreprocessedCodeSnippets } from 'types/PreprocessedCodeSnippets'

export const getStaticProps = defineStaticProps(async (_context) => {
  const { preprocessedCodeSnippets, usedByCount } = await promiseAllProperties({
    preprocessedCodeSnippets: promiseAllProperties<PreprocessedCodeSnippets>({
      light: htmlForCodeSnippets('light'),
      dark: htmlForCodeSnippets('dark'),
    }),
    usedByCount: getUsedByCount(),
  })
  const tree = buildTree(allDocs)

  return { props: { preprocessedCodeSnippets, usedByCount, tree } }
})

const Page: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  preprocessedCodeSnippets,
  usedByCount,
  tree,
}) => {
  const colorScheme = useColorScheme()

  return (
    <Container tree={tree}>
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
