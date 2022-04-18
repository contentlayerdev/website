import { Post } from 'contentlayer/generated'
import { FC, useEffect, useState } from 'react'
import { BlogDetails } from 'src/components/blog/BlogDetails'
import Link from 'next/link'
import { Icon } from 'src/components/common/Icon'
import Image from 'next/image'
import { format } from 'date-fns'

export const BlogHeader: FC<{ post: Post }> = ({ post }) => {
  const [top, setTop] = useState<boolean>(true)

  useEffect(() => {
    const handleScroll = () => setTop(window.scrollY <= 50)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <div className="mx-auto mb-16 space-y-8 lg:max-w-[994px] lg:space-y-12 lg:px-16">
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 md:text-3xl lg:text-4xl">
            {post.title}
          </h1>
          <p className="mb-2 flex">
            <span className="mt-1 mr-2 block w-3 shrink-0 text-violet-600 dark:text-violet-400">
              <Icon name="calendar" />
            </span>
            <span>{format(new Date(post.date), 'MMMM dd, yyyy')}</span>
          </p>
        </div>
      </div>
      <div
        className={`fixed inset-x-0 top-16 z-10 hidden h-16 w-screen border-b border-gray-200 bg-white bg-opacity-90 backdrop-blur backdrop-filter transition-opacity duration-200 dark:border-gray-800 dark:bg-gray-950 lg:block ${
          top ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="mx-auto h-full lg:max-w-[994px] lg:px-16">
          <div className="flex h-full items-center space-x-2 text-sm">
            <Link href="/blog">
              <a className="inline whitespace-nowrap hover:text-slate-600 dark:hover:text-slate-300">Blog</a>
            </Link>
            <span className="inline-block w-1.5 text-slate-400 dark:text-slate-500">
              <Icon name="chevron-right" />
            </span>
            <h1 className="text-slate-800 dark:text-slate-200 ">{post.title}</h1>
          </div>
        </div>
      </div>
    </>
  )
}
