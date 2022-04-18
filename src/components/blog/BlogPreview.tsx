import { Post } from 'contentlayer/generated'
import { BlogDetails } from 'src/components/blog/BlogDetails'
import { Heading } from '../../components/landing-page/Heading'
import { Paragraph } from '../../components/landing-page/Paragraph'
import { ChevronLink } from '../../components/common/ChevronLink'
import { FC } from 'react'
import Image from 'next/image'
import { Card } from '../common/Card'
import Link from 'next/link'
import { Icon } from 'src/components/common/Icon'
import { format } from 'date-fns'

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
        <div className="flex space-x-6 text-sm">
          <p className="mb-2 flex">
            <span className="mt-1 mr-2 block w-3 shrink-0 text-violet-600 dark:text-violet-400">
              <Icon name="calendar" />
            </span>
            <span>{format(new Date(post.date), 'MMMM dd, yyyy')}</span>
          </p>
          <p className="flex">
            <span className="mt-1 mr-2 block w-3 shrink-0 text-violet-600 dark:text-violet-400">
              <Icon name="users" />
            </span>
            <span>
              {post.authors.map(({ name }, index) => (
                <span key={index}>
                  {index > 0 && ', '}
                  {name}
                </span>
              ))}
            </span>
          </p>
        </div>
        <Paragraph>{post.excerpt}</Paragraph>
        <ChevronLink label="Read more" url={'/blog/' + post.slug} />
      </div>
    </Card>
  )
}
