import { Post } from 'contentlayer/generated'
import { BlogDetails } from 'src/components/blog/BlogDetails'
import { Heading } from '../../components/landing-page/Heading'
import { Paragraph } from '../../components/landing-page/Paragraph'
import { ChevronLink } from '../../components/common/ChevronLink'
import { FC } from 'react'

export const BlogPreview: FC<{ post: Post }> = ({ post }) => {
  return (
    <div className="space-y-4">
      <Heading level={3}>{post.title}</Heading>
      <BlogDetails post={post} hideBackButton />
      <Paragraph>{post.excerpt}</Paragraph>
      <ChevronLink label="Read more" url={'/blog/' + post.slug} />
    </div>
  )
}
