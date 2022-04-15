import { Post } from 'contentlayer/generated'
import { FC, useEffect, useState } from 'react'
import { BlogDetails } from 'src/components/blog/BlogDetails'
import Link from 'next/link'
import { Icon } from 'src/components/common/Icon'
import Image from 'next/image'

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
      <div className="mb-16 max-w-4xl space-y-8 lg:space-y-12">
        <div className="space-y-4">
          <Link href="/blog">
            <a className="flex items-center font-medium text-slate-600 hover:text-slate-700 dark:text-slate-300 dark:hover:text-slate-200">
              <span className="mr-2 block w-1.5 shrink-0">
                <Icon name="chevron-left" />
              </span>
              <span>Back to blog</span>
            </a>
          </Link>
          <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 md:text-3xl lg:text-4xl">
            {post.title}
          </h1>
          <BlogDetails post={post} />
        </div>
        <BlogDetails post={post} className="lg:hidden" />
      </div>
      <div
        className={`fixed inset-x-0 top-16 z-10 hidden h-16 w-screen border-b border-gray-200 bg-white bg-opacity-90 backdrop-blur backdrop-filter transition-opacity duration-200 dark:border-gray-800 dark:bg-gray-950 lg:block ${
          top ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="mx-auto h-full max-w-screen-2xl">
          <div className="flex h-full items-center space-x-2 px-8 text-sm">
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
