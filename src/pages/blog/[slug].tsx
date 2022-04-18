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

export const getStaticPaths = async () => {
  const paths = allPosts.map(({ slug }) => {
    return { params: { slug } }
  })
  return { paths, fallback: false }
}

export type PreprocessedCodeSnippetsRemark = Record<ColorScheme, CodeSnippets>

export const getStaticProps = defineStaticProps(async (context) => {
  const params = context.params as any
  const post = allPosts.find((_) => _.slug === params.slug)!

  let betaSnippets: { remark: PreprocessedCodeSnippetsRemark; contentlayer: PreprocessedCodeSnippets } | null = null
  if (params.slug === 'beta') {
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

export const H2: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const slug = sluggifyTitle(getNodeText(children))
  return <h2 id={slug}>{children}</h2>
}

export const H3: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const slug = sluggifyTitle(getNodeText(children))
  return <h3 id={slug}>{children}</h3>
}

export const H4: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const slug = sluggifyTitle(getNodeText(children))
  return <h4 id={slug}>{children}</h4>
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
      <div className="relative mx-auto max-w-screen-2xl p-4 py-8 md:p-8 md:py-16 lg:px-16">
        <BlogHeader post={post} />
        <div className="blog prose prose-lg prose-slate prose-violet relative mx-auto w-full max-w-[866px] prose-headings:font-semibold prose-p:text-slate-500 prose-a:font-normal prose-code:font-normal prose-code:before:content-none prose-code:after:content-none prose-ul:text-slate-500 prose-hr:border-gray-200 dark:prose-invert dark:prose-p:text-slate-400 dark:prose-a:text-violet-400 dark:prose-ul:text-slate-400 dark:prose-hr:border-gray-800">
          {MDXContent && <MDXContent components={{ ...mdxComponents, BetaCodeWindow }} />}
          {post.related_posts && (
            <>
              <hr />
              <RelatedPosts posts={post.related_posts} />
            </>
          )}
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
