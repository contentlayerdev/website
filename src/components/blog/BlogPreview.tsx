import { Post } from 'contentlayer/generated'
import { BlogDetails } from 'src/components/blog/BlogDetails'
import { Heading } from '../../components/landing-page/Heading'
import { Paragraph } from '../../components/landing-page/Paragraph'
import { ChevronLink } from '../../components/common/ChevronLink'
import { FC } from 'react'
import Image from 'next/image'
import { Card } from '../common/Card'
import Link from 'next/link'

export const BlogPreview: FC<{ post: Post }> = ({ post }) => {
  return (
    <Card className="grid grid-cols-1 gap-8 p-4 sm:p-8 md:grid-cols-2 lg:gap-16">
      <div>
        <Link href={`/blog/${post.slug}`}>
          <a>
            <Image
              src={post.seo.imagePath}
              alt={post.cover_image.alt}
              width={540}
              height={283}
              placeholder="blur"
              blurDataURL={post.cover_image.url}
            />
          </a>
        </Link>
      </div>
      <div className="space-y-4">
        <Heading level={3}>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </Heading>
        <BlogDetails post={post} />
        <Paragraph>{post.excerpt}</Paragraph>
        <ChevronLink label="Read more" url={'/blog/' + post.slug} />
      </div>
    </Card>
  )
}
