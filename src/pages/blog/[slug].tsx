import type { InferGetStaticPropsType } from 'next'
import { useLiveReload, useMDXComponent } from 'next-contentlayer/hooks'
import type { FC } from 'react'
import { allDocs, Doc } from 'contentlayer/generated'
import { Container } from '../../components/common/Container'
import { defineStaticProps, toParams } from '../../utils/next'
import { DocsNavigation } from 'src/components/docs/DocsNavigation'
import { Callout } from '../../components/common/Callout'
import { DocsCard as Card } from '../../components/docs/DocsCard'
import Link from 'next/link'
import Image from 'next/image'
import { DocsHeader } from '../../components/docs/DocsHeader'
import { ChevronLink } from '../../components/common/ChevronLink'
import { Label } from '../../components/common/Label'
import { DocsFooter } from '../../components/docs/DocsFooter'
import { getNodeText, sluggifyTitle } from '../../utils/sluggify'
import { PageNavigation } from 'src/components/common/PageNavigation'
import { buildTree } from 'src/utils/build-tree'
import { H2, H3, H4 } from 'src/components/common/Headings'
import { allPosts } from 'contentlayer/generated'
import { User } from 'src/components/common/User'
import { Icon } from 'src/components/common/Icon'
import { format } from 'date-fns'

export const getStaticPaths = async () => {
  const paths = allPosts.map(({ slug }) => {
    return { params: { slug } }
  })
  return { paths, fallback: 'blocking' }
}

export const getStaticProps = defineStaticProps(async (context) => {
  const params = context.params as any
  const post = allPosts.find((_) => _.slug === params.slug)!
  const tree = buildTree(allDocs)

  return { props: { post, tree } }
})

const mdxComponents = { Callout, Card, Image, Link, ChevronLink, Label, h2: H2, h3: H3, h4: H4 }

const Page: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ post, tree }) => {
  useLiveReload()
  const MDXContent = useMDXComponent(post.body.code || '')

  return (
    <Container title={post.title + ' – Contentlayer'} description={post.excerpt} tree={tree}>
      <div className="relative mx-auto max-w-screen-2xl ">
        <div className="relative w-full border-gray-200 px-8 pt-16 dark:border-gray-800 lg:flex lg:border-b lg:pb-16">
          <div className="hidden w-64 shrink-0 lg:block" />
          <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 md:text-3xl lg:text-4xl">
            {post.title}
          </h1>
          <div className="hidden w-80 shrink-0 xl:block" />
          <div className="absolute right-0 -bottom-px hidden h-px w-80 bg-gradient-to-r from-white/0 to-white/100 2xl:block" />
          <div className="absolute left-0 -bottom-px hidden h-px w-64 bg-gradient-to-l from-white/0 to-white/100 2xl:block" />
        </div>

        <div className="lg:flex lg:items-start">
          <div className="sticky top-16 w-full shrink-0 border-b border-gray-200 p-8 text-sm dark:border-gray-800 lg:w-64 lg:border-none lg:pl-16">
            <Link href="/blog">
              <a className="mb-4 flex font-medium text-slate-600 hover:text-slate-700 dark:text-slate-300 dark:hover:text-slate-200">
                <span className="mr-2 mt-[5px] block w-1.5 shrink-0">
                  <Icon name="chevron-left" />
                </span>
                <span>Back to blog</span>
              </a>
            </Link>
            <p className="mb-2 flex">
              <span className="mr-2 mt-1 block w-3 shrink-0 text-violet-600 dark:text-violet-400">
                <Icon name="calendar" />
              </span>
              <span>{format(new Date(post.date), 'MMMM dd, yyyy')}</span>
            </p>
            <p className="flex">
              <span className="mr-2 mt-1 block w-3 shrink-0 text-violet-600 dark:text-violet-400">
                <Icon name="users" />
              </span>
              <span>{post.authors}</span>
            </p>
          </div>

          <div className="prose prose-slate prose-violet mb-4 max-w-full shrink p-8 prose-headings:font-semibold prose-p:text-slate-500 prose-a:font-normal prose-code:font-normal prose-code:before:content-none prose-code:after:content-none prose-ul:text-slate-500 prose-hr:border-gray-200 dark:prose-invert dark:prose-p:text-slate-400 dark:prose-a:text-violet-400 dark:prose-ul:text-slate-400 dark:prose-hr:border-gray-800 md:mb-8 lg:pr-16 xl:pr-8">
            {MDXContent && <MDXContent components={mdxComponents} />}
          </div>

          <div style={{ maxHeight: 'calc(100vh - 64px)' }} className="sticky top-16 hidden shrink-0 xl:block">
            <div className="w-80 overflow-y-scroll p-8 pr-16">
              <PageNavigation headings={post.headings} />
            </div>
            <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-t from-white/0 to-white/100 dark:from-gray-950/0 dark:to-gray-950/100" />
            <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-b from-white/0 to-white/100 dark:from-gray-950/0 dark:to-gray-950/100" />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Page
