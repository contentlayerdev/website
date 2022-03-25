import type { InferGetStaticPropsType } from 'next'
// TODO remove eslint-disable when fixed https://github.com/import-js/eslint-plugin-import/issues/1810
// eslint-disable-next-line import/no-unresolved
import { useLiveReload } from 'next-contentlayer/hooks'
import type { FC } from 'react'
import { allDocs, Doc } from 'contentlayer/generated'
import { Container } from '../../components/Container'
import { DocLayout } from '../../layouts/DocLayout'
import { defineStaticProps, toParams } from '../../utils/next'
import { DocsNavigation } from 'src/components/DocsNavigation'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { Callout } from '../../components/Callout'
import { Card } from '../../components/DocsCard'
import { Label } from '../../components/Label'
import Link from 'next/link'
import Image from 'next/image'
import { stringify } from 'postcss'
import { DocsHeader } from '../../components/DocsHeader'

export const getStaticPaths = async () => {
  const paths = allDocs.map((_) => _.pathSegments.map((_: PathSegment) => _.pathName).join('/')).map(toParams)
  return { paths, fallback: 'blocking' }
}

export const getStaticProps = defineStaticProps(async (context) => {
  const params = context.params as any
  const pagePath = params.slug?.join('/') ?? ''
  const doc = allDocs.find((_) => _.pathSegments.map((_: PathSegment) => _.pathName).join('/') === pagePath)!
  let slugs = params.slug ? ['', ...params.slug] : []
  let path = ''
  let breadcrumbs: any = []
  for (const slug of slugs) {
    path += path == '' ? slug : '/' + slug
    const navTitle = allDocs.find(
      (_) => _.pathSegments.map((_: PathSegment) => _.pathName).join('/') === path,
    )?.nav_title
    const title = allDocs.find((_) => _.pathSegments.map((_: PathSegment) => _.pathName).join('/') === path)?.title
    breadcrumbs.push({ path: '/docs/' + path, slug, title: navTitle || title })
  }
  const tree = buildTree(allDocs)
  const childrenTree = buildTree(
    allDocs,
    doc.pathSegments.map((_: PathSegment) => _.pathName),
  )
  return { props: { doc, tree, breadcrumbs, childrenTree } }
})

const mdxComponents = { Callout, Card, Image, Link }

const Page: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ doc, tree, breadcrumbs, childrenTree }) => {
  useLiveReload()
  const MDXContent = doc?.body?.code ? useMDXComponent(doc.body.code) : null

  return (
    <Container title={doc.title + ' – Contentlayer'} description={doc.excerpt}>
      <div className="relative mx-auto flex w-full max-w-screen-2xl">
        <div
          style={{ height: 'calc(100vh - 64px)' }}
          className="sticky top-16 shrink-0 border-r border-gray-200 dark:border-gray-800"
        >
          <div className="-ml-3 h-full overflow-y-scroll p-8 pl-16">
            <DocsNavigation tree={tree} />
          </div>
          <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-t from-white/0 to-white/100 dark:from-gray-950/0 dark:to-gray-950/100" />
          <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-b from-white/0 to-white/100 dark:from-gray-950/0 dark:to-gray-950/100" />
        </div>
        <div className="w-full grow">
          <DocsHeader tree={tree} breadcrumbs={breadcrumbs} title={doc.title} />
          <div className="max-w-2xl p-8 px-16">{MDXContent && <MDXContent components={mdxComponents} />}</div>
        </div>
      </div>
    </Container>
  )
  //return <DocLayout {...{ doc, tree, childrenTree }} />
}

export default Page

export type TreeRoot = TreeNode[]

export type TreeNode = {
  title: string
  nav_title: string | null
  label: string | null
  excerpt: string | null
  urlPath: string
  children: TreeNode[]
}

type PathSegment = { order: number; pathName: string }

const buildTree = (docs: Doc[], parentPathNames: string[] = []): TreeNode[] => {
  const level = parentPathNames.length

  return docs
    .filter(
      (_) =>
        _.pathSegments.length === level + 1 &&
        _.pathSegments
          .map((_: PathSegment) => _.pathName)
          .join('/')
          .startsWith(parentPathNames.join('/')),
    )
    .sort((a, b) => a.pathSegments[level].order - b.pathSegments[level].order)
    .map<TreeNode>((doc) => ({
      nav_title: doc.nav_title ?? null,
      title: doc.title,
      label: doc.label ?? null,
      excerpt: doc.excerpt ?? null,
      urlPath: '/docs/' + doc.pathSegments.map((_: PathSegment) => _.pathName).join('/'),
      children: buildTree(
        docs,
        doc.pathSegments.map((_: PathSegment) => _.pathName),
      ),
    }))
}
