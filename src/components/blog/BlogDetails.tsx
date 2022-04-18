import { Post } from 'contentlayer/generated'
import { FC } from 'react'
import Link from 'next/link'
import { Icon } from 'src/components/common/Icon'
import { format } from 'date-fns'
import { User } from '../common/User'

export const BlogDetails: FC<{ post: Post; className?: string }> = ({ post, className }) => {
  console.log(post)
  return (
    <div className={`space-y-4 text-sm ${className}`}>
      <p className="mb-2 flex">
        <span className="mt-1 mr-2 block w-3 shrink-0 text-violet-600 dark:text-violet-400">
          <Icon name="calendar" />
        </span>
        <span>{format(new Date(post.date), 'MMMM dd, yyyy')}</span>
      </p>
      {/* {post.authors.map(({ name, handle, avatar_url }, index) => (
        <User key={index} />
      ))} */}
      {/* <p className="flex">
        <span className="mt-1 mr-2 block w-3 shrink-0 text-violet-600 dark:text-violet-400">
          <Icon name="users" />
        </span>
        <span>{post.authors}</span>
      </p> */}
    </div>
  )
}
