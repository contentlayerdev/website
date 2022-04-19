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
import { BlogDetails } from 'src/components/blog/BlogDetails'
import { Author } from 'src/components/common/Author'
import { Dashed } from 'src/components/landing-page/Dashed'

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
  console.time(`getStaticProps /blog/${context.params!.slug}`)

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

  console.timeEnd(`getStaticProps /blog/${context.params!.slug}`)

  return { props: { post, betaSnippets } }
})

const Image: FC<{ src: string; alt?: string; width?: number; height?: number; className?: string }> = ({
  src,
  alt,
  width,
  height,
  className,
}) => {
  return (
    <div className={`${className} overflow-hidden rounded-lg`}>
      <div className="-mb-3">
        <NextImage
          src={src}
          alt={alt}
          width={width ?? '1600'}
          height={height ?? '900'}
          placeholder="blur"
          blurDataURL={src}
        />
      </div>
    </div>
  )
}

const P: React.FC<React.PropsWithChildren<{}>> = ({ children }) => <div className="mb-4">{children}</div>

const Transform: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`mx-auto ${className}`}>
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
  Dashed,
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
      <div className="relative mx-auto max-w-screen-2xl px-4 py-8 md:px-8 md:py-16 lg:px-0">
        <BlogHeader post={post} />
        <div className="blog prose prose-lg prose-slate prose-violet relative mx-auto w-full max-w-full prose-headings:mt-16 prose-headings:font-semibold prose-a:font-normal prose-code:font-normal prose-code:before:content-none prose-code:after:content-none prose-hr:border-gray-200 dark:prose-invert dark:prose-a:text-violet-400 dark:prose-hr:border-gray-800 lg:max-w-[994px] lg:px-16">
          {MDXContent && <MDXContent components={{ ...mdxComponents, BetaCodeWindow }} />}
          <hr />
          {post.authors.map((author, index) => (
            <Author key={index} {...author} />
          ))}
          {post.related_posts && <RelatedPosts posts={post.related_posts} />}
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
