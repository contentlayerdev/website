import type { InferGetStaticPropsType } from 'next'
// TODO remove eslint-disable when fixed https://github.com/import-js/eslint-plugin-import/issues/1810
// eslint-disable-next-line import/no-unresolved
import { useLiveReload, useMDXComponent } from 'next-contentlayer/hooks'
import { FC, useEffect, useRef, useState } from 'react'
import stackblitz, { type VM } from '@stackblitz/sdk'
import { allExamples } from 'contentlayer/generated'
import { Container } from '../../components/common/Container'
import { defineStaticProps, toParams } from '../../utils/next'
import { DocsNavigation } from 'src/components/docs/DocsNavigation'
import { Callout } from '../../components/common/Callout'
import { DocsCard as Card } from '../../components/docs/DocsCard'
import { Link } from 'src/components/common/Link'
import Image from 'next/image'
import { DocsHeader } from '../../components/docs/DocsHeader'
import { ChevronLink } from '../../components/common/ChevronLink'
import { Label } from '../../components/common/Label'
import { buildExamplesTree } from 'src/utils/build-examples-tree'
import { H2, H3, H4 } from 'src/components/common/Headings'
import { OptionsTable, OptionTitle, OptionDescription } from 'src/components/docs/OptionsTable'
import { ExamplesFooter } from 'src/components/examples/ExamplesFooter'
import { Button } from 'src/components/common/Button'

export const getStaticPaths = async () => {
  const paths = allExamples
    .map((_) =>
      _.pathSegments
        .map((_: PathSegment) => _.pathName)
        .slice(1)
        .join('/'),
    )
    .map(toParams)
  return { paths, fallback: false }
}

export const getStaticProps = defineStaticProps(async (context) => {
  const params = context.params as any
  const pagePath = params.slug ? ['examples', params.slug].join('/') : 'examples'
  const example = allExamples.find((_) => _.pathSegments.map((_: PathSegment) => _.pathName).join('/') === pagePath)!
  let slugs = params.slug ? ['', ...params.slug] : []
  let path = 'examples'
  let breadcrumbs: any = []
  for (const slug of slugs) {
    path += slug ? '/' + slug : ''
    const navTitle = allExamples.find(
      (_) => _.pathSegments.map((_: PathSegment) => _.pathName).join('/') === path,
    )?.nav_title
    const title = allExamples.find((_) => _.pathSegments.map((_: PathSegment) => _.pathName).join('/') === path)?.title
    breadcrumbs.push({ path: '/' + path, slug, title: navTitle || title })
  }
  const tree = buildExamplesTree(allExamples)
  return { props: { example, tree, breadcrumbs } }
})

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
  OptionsTable,
  OptionTitle,
  OptionDescription,
}

const Page: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ example, tree, breadcrumbs }) => {
  useLiveReload()
  const MDXContent = useMDXComponent(example.body.code || '')
  const ref = useRef<HTMLDivElement>(null)
  const [vm, setVm] = useState<VM | undefined>(undefined)
  const [fullScreen, setFullScreen] = useState<boolean>(false)

  useEffect(() => {
    if (example.github_repo && ref.current) {
      stackblitz
        .embedGithubProject(ref.current, 'contentlayerdev/next-contentlayer-example', {
          openFile: example.open_file,
          showSidebar: true,
        })
        .then((_) => setVm(_))
    }
  }, [ref, example.open_file, example.github_repo])

  useEffect(() => {
    if (vm && fullScreen) {
      vm.editor.showSidebar()
    }
  }, [vm, fullScreen])

  return (
    <Container title={example.title + ' – Contentlayer'} description={example.excerpt}>
      <div className="relative mx-auto w-full max-w-screen-2xl lg:flex lg:items-start">
        <div
          style={{ height: 'calc(100vh - 64px)' }}
          className="sticky top-16 hidden shrink-0 border-r border-gray-200 dark:border-gray-800 lg:block"
        >
          <div className="-ml-3 h-full overflow-y-scroll p-8 pl-16">
            <DocsNavigation tree={tree} />
          </div>
          <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-t from-white/0 to-white/100 dark:from-gray-950/0 dark:to-gray-950/100" />
          <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-b from-white/0 to-white/100 dark:from-gray-950/0 dark:to-gray-950/100" />
        </div>
        <div className="relative w-full grow">
          <DocsHeader tree={tree} breadcrumbs={breadcrumbs} title={example.title} />
          <div className="docs prose prose-slate prose-violet mx-auto mb-4 w-full max-w-3xl shrink p-4 pb-8 prose-headings:font-semibold prose-a:font-normal prose-code:font-normal prose-code:before:content-none prose-code:after:content-none prose-hr:border-gray-200 dark:prose-invert dark:prose-a:text-violet-400 dark:prose-hr:border-gray-800 md:mb-8 md:px-8 lg:mx-0 lg:max-w-full lg:px-16">
            {MDXContent && <MDXContent components={mdxComponents as any} />}
            {example.github_repo && (
              <div
                className={
                  fullScreen
                    ? 'fixed inset-0 top-16 z-20 bg-gray-950/10 p-8 backdrop-blur-lg backdrop-filter dark:bg-gray-950/50'
                    : 'relative mt-8 lg:mt-16'
                }
              >
                <div className="mb-8 hidden justify-end md:flex">
                  <Button
                    theme="primary"
                    label={fullScreen ? 'Collapse Playground' : 'Expand Playground'}
                    icon={fullScreen ? 'collapse' : 'expand'}
                    action={() => setFullScreen(!fullScreen)}
                  />
                </div>
                <div
                  className="overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-900"
                  style={{ height: fullScreen ? 'calc(100vh - 190px)' : 700 }}
                >
                  <div className="h-full w-full" ref={ref} />
                </div>
              </div>
            )}
            <ExamplesFooter example={example} />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Page
