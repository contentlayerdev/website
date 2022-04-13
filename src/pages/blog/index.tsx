import type { InferGetStaticPropsType } from 'next'
// TODO remove eslint-disable when fixed https://github.com/import-js/eslint-plugin-import/issues/1810
// eslint-disable-next-line import/no-unresolved
import { useLiveReload } from 'next-contentlayer/hooks'
import type { FC } from 'react'
import { allDocs, allPosts } from 'contentlayer/generated'
import { Container } from '../../components/common/Container'
import { defineStaticProps } from '../../utils/next'
import { Heading } from '../../components/landing-page/Heading'
import { Paragraph } from '../../components/landing-page/Paragraph'
import { ChevronLink } from '../../components/common/ChevronLink'
import { buildDocsTree } from 'src/utils/build-docs-tree'
import { BlogDetails } from 'src/components/blog/BlogDetails'

const content = {
  title: 'Contentlayer Blog',
  description:
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
}

export const getStaticProps = defineStaticProps(async (context) => {
  const posts = allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const tree = buildDocsTree(allDocs)

  return { props: { posts, tree } }
})

const Blog: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ posts, tree }) => {
  useLiveReload()

  return (
    <Container title="Blog – Contentlayer" description={content.description} tree={tree}>
      <div className="mx-auto grid w-full max-w-screen-xl grid-cols-1 gap-16 px-4 py-8 md:grid-cols-2 md:px-8 md:py-24 lg:py-32">
        <div className="max-w-md space-y-8">
          <Heading level={1}>{content.title}</Heading>
          <Paragraph className="text-lg">{content.description}</Paragraph>
        </div>
        <div className="space-y-12 md:space-y-16">
          {posts.map((post, index) => (
            <div key={index} className="space-y-4">
              <Heading level={3}>{post.title}</Heading>
              <BlogDetails post={post} hideBackButton />
              <Paragraph>{post.excerpt}</Paragraph>
              <ChevronLink label="Read more" url={'/blog/' + post.slug} />
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}

export default Blog
