import { Post } from 'contentlayer/generated'
import { FC } from 'react'
import Link from 'next/link'
import { Icon } from 'src/components/common/Icon'
import { format } from 'date-fns'

export const BlogDetails: FC<{ post: Post; className?: string }> = ({ post, className }) => {
  return (
    <div className={`text-sm ${className}`}>
      <Link href="/blog">
        <a className="mb-4 flex font-medium text-slate-600 hover:text-slate-700 dark:text-slate-300 dark:hover:text-slate-200">
          <span className="mr-2 mt-[5px] block w-1.5 shrink-0">
            <Icon name="chevron-left" />
          </span>
          <span>Back to blog</span>
        </a>
      </Link>
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
        <span>{post.authors}</span>
      </p>
    </div>
  )
}
