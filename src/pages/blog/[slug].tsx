import type { InferGetStaticPropsType } from 'next'
// TODO remove eslint-disable when fixed https://github.com/import-js/eslint-plugin-import/issues/1810
// eslint-disable-next-line import/no-unresolved
import { useLiveReload, useMDXComponent } from 'next-contentlayer/hooks'
import { FC, useEffect, useMemo, useState } from 'react'
import { allPosts } from 'contentlayer/generated'
import { Container } from '../../components/common/Container'
import { defineStaticProps } from '../../utils/next'
import { Callout } from '../../components/common/Callout'
import { DocsCard as Card } from '../../components/docs/DocsCard'
import { Link } from 'src/components/common/Link'
import NextImage from 'next/image'
import { ChevronLink } from '../../components/common/ChevronLink'
import { Label } from '../../components/common/Label'
import { BlogHeader } from 'src/components/blog/BlogHeader'
import { sluggifyTitle, getNodeText } from 'src/utils/sluggify'
import { Playground } from 'src/components/blog/Playground'
import { RelatedPosts } from 'src/components/blog/RelatedPosts'
import { TLDR } from 'src/components/blog/TLDR'
import { BulletList, BulletListItem } from 'src/components/blog/BulletList'
import { ContentStack } from 'src/components/blog/ContentStack'
import { BenchmarkResults } from 'src/components/blog/BenchmarkResults'
import { DataTransformation } from 'src/components/landing-page/DataTransformation'
import { Support } from 'src/components/landing-page/Support'
import { Video } from 'src/components/landing-page/Video'
import { localStep2DataTransformation as dataTransformation } from '../../components/landing-page/HowItWorks'
import { CodeWindow } from 'src/components/landing-page/CodeWindow'
import { ColorScheme, snippetToHtml } from 'src/utils/syntax-highlighting'
import { codeSnippets, CodeSnippets } from 'src/utils/blog/beta-post-snippets'
import { promiseAllProperties } from 'src/utils/object'
import { useColorScheme } from 'src/components/ColorSchemeContext'
import { htmlForCodeSnippets, PreprocessedCodeSnippets } from '..'
import { H2, H3, H4 } from 'src/components/common/Headings'

export const getStaticPaths = async () => {
  const paths = allPosts.map(({ slug }) => {
    return { params: { slug } }
  })
  return { paths, fallback: false }
}

let devcache_betaSnippets: BetaSnippets | null = null

export type PreprocessedCodeSnippetsRemark = Record<ColorScheme, CodeSnippets>

type BetaSnippets = { remark: PreprocessedCodeSnippetsRemark; contentlayer: PreprocessedCodeSnippets }

export const getStaticProps = defineStaticProps(async (context) => {
  const params = context.params as any
  const post = allPosts.find((_) => _.slug === params.slug)!

  let betaSnippets: BetaSnippets | null = devcache_betaSnippets
  if (params.slug === 'beta' && !betaSnippets) {
    betaSnippets = await promiseAllProperties({
      remark: promiseAllProperties<PreprocessedCodeSnippetsRemark>({
        light: htmlForCodeSnippetsRemark('light'),
        dark: htmlForCodeSnippetsRemark('dark'),
      }),
      contentlayer: promiseAllProperties<PreprocessedCodeSnippets>({
        light: htmlForCodeSnippets('light'),
        dark: htmlForCodeSnippets('dark'),
      }),
    })

    devcache_betaSnippets = betaSnippets
  }

  return { props: { post, betaSnippets } }
})

const Image: FC<{ src: string; width?: number; height?: number; className?: string }> = ({
  src,
  width,
  height,
  className,
}) => {
  return (
    <div className={`${className} overflow-hidden rounded-lg`}>
      <NextImage src={src} width={width ?? '1600'} height={height ?? '900'} placeholder="blur" blurDataURL={src} />
    </div>
  )
}

const P: React.FC<React.PropsWithChildren<{}>> = ({ children }) => <div className="mb-4">{children}</div>

const Transform: React.FC<{ className?: string }> = ({ className }) => (
  <div className={className}>
    <DataTransformation from={dataTransformation.from} to={dataTransformation.to} />
  </div>
)

const mdxComponents = {
  Callout,
  Card,
  Image,
  Link,
  ChevronLink,
  Label,
  h2: H2,
  h3: H3,
  h4: H4,
  a: Link,
  p: P,
  img: Image,
  Playground,
  BulletList,
  BulletListItem,
  Transform,
  Video,
  TLDR,
  ContentStack,
  Support,
  BenchmarkResults,
}

const Post: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ post, betaSnippets }) => {
  useLiveReload()
  const MDXContent = useMDXComponent(post.body.code || '')

  const preferredColorScheme = useColorScheme()
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    if (preferredColorScheme === 'system') {
      setColorScheme(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    } else {
      setColorScheme(preferredColorScheme)
    }
  }, [preferredColorScheme])

  const BetaCodeWindow = useMemo(
    () =>
      betaSnippets
        ? {
            Remark: () => <CodeWindow snippets={betaSnippets.remark[colorScheme]} />,
            ContentlayerConfig: () => <CodeWindow snippets={betaSnippets.contentlayer[colorScheme].howItWorksStep1} />,
            ContentlayerNext: () => <CodeWindow snippets={betaSnippets.contentlayer[colorScheme].howItWorksStep3} />,
          }
        : null,
    [betaSnippets, colorScheme],
  )

  return (
    <Container
      title={post.title + ' – Contentlayer'}
      description={post.excerpt}
      imagePath={post.seo?.imagePath ?? null}
      urlPath={`/${post.url_path}`}
    >
      <div className="relative mx-auto max-w-screen-2xl md:pt-8 lg:px-8 lg:pt-16">
        <div className="w-full lg:flex lg:justify-center">
          {/* <div className="lg:flex lg:items-start"> */}
          {/* <div className="w-full p-4 py-8 mx-auto mb-4 shrink md:mb-8 md:px-8 lg:mx-0 lg:mb-16 lg:max-w-full lg:pr-16 xl:pr-8"> */}
          <div className="mx-auto mb-4 shrink p-4 py-8 md:mb-8 md:px-8 lg:mx-0 lg:mb-16 lg:max-w-full lg:pr-16 xl:pr-8">
            <BlogHeader post={post} />
            <div className="blog prose prose-lg prose-slate prose-violet relative w-full max-w-[866px] prose-headings:font-semibold prose-p:text-slate-500 prose-a:font-normal prose-code:font-normal prose-code:before:content-none prose-code:after:content-none prose-ul:text-slate-500 prose-hr:border-gray-200 dark:prose-invert dark:prose-p:text-slate-400 dark:prose-a:text-violet-400 dark:prose-ul:text-slate-400 dark:prose-hr:border-gray-800">
              {MDXContent && <MDXContent components={{ ...mdxComponents, BetaCodeWindow }} />}
              {post.related_posts && (
                <>
                  <hr />
                  <RelatedPosts posts={post.related_posts} />
                </>
              )}
            </div>
          </div>
          {/* <div
            style={{ maxHeight: 'calc(100vh - 64px)' }}
            className="sticky hidden p-8 pr-16 overflow-y-scroll top-32 w-80 shrink-0 xl:block"
          >
            <PageNavigation headings={post.headings} />
            <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-t from-white/0 to-white/100 dark:from-gray-950/0 dark:to-gray-950/100" />
            <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-b from-white/0 to-white/100 dark:from-gray-950/0 dark:to-gray-950/100" />
          </div> */}
        </div>
      </div>
    </Container>
  )
}

export default Post

const htmlForCodeSnippetsRemark = (colorScheme: ColorScheme): Promise<CodeSnippets> =>
  Promise.all(
    codeSnippets.map(({ content, file, lines }) =>
      snippetToHtml(content, colorScheme).then((_) => ({ file, lines, content: _ })),
    ),
  ) as any // TODO: fix type
