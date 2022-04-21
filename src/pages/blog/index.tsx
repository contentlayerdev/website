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
import { BlogPreview } from 'src/components/blog/BlogPreview'

const content = {
  title: 'Contentlayer Blog',
  description: `Working with content for the web shouldn't be difficult. That's why we built Contentlayer.`,
}

export const getStaticProps = defineStaticProps(async (context) => {
  const posts = allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return { props: { posts } }
})

const Blog: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ posts }) => {
  useLiveReload()

  return (
    <Container title="Blog – Contentlayer" description={content.description} urlPath="/blog">
      <div className="w-full max-w-screen-xl px-4 py-8 mx-auto space-y-16 md:px-8 md:py-24 lg:space-y-24 lg:py-32">
        <div className="max-w-3xl space-y-8">
          <Heading level={1}>{content.title}</Heading>
          <Paragraph className="text-lg">{content.description}</Paragraph>
        </div>
        <div className="space-y-12 md:space-y-16">
          {posts.map((post, index) => (
            <BlogPreview key={index} post={post} />
          ))}
        </div>
      </div>
    </Container>
  )
}

export default Blog
