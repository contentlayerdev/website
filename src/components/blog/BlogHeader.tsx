import { Post } from 'contentlayer/generated'
import { FC, useEffect, useState } from 'react'
import { BlogDetails } from 'src/components/blog/BlogDetails'
import Link from 'next/link'
import { Icon } from 'src/components/common/Icon'
import { allPosts } from 'contentlayer/generated'
import { Heading } from '../landing-page/Heading'
import { Card } from '../common/Card'
import { BlogPreview } from './BlogPreview'

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
      <div className="mb-8 space-y-8 lg:mb-12 lg:space-y-12">
        <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 md:text-3xl lg:text-4xl">
          {post.title}
        </h1>
        <p className="leading-relaxed">{post.excerpt}</p>
        <BlogDetails post={post} className="lg:hidden" />
        {post.related_posts && (
          <div>
            <h2 className="mb-8 text-2xl font-semibold text-slate-800 dark:text-slate-200">Related Posts</h2>
            <div className={`grid grid-cols-1 gap-8 ${post.related_posts.length > 1 ? 'md:grid-cols-2' : ''}`}>
              {post.related_posts.map(({ slug }, index) => {
                const post = allPosts.find((_) => _.slug === slug)!
                return (
                  <Card key={index} className="p-8">
                    <BlogPreview post={post} />
                  </Card>
                )
              })}
            </div>
          </div>
        )}
        <hr className="border-gray-200 dark:border-gray-800" />
      </div>
      <div
        className={`fixed inset-x-0 top-16 z-10 hidden h-16 w-screen border-b border-gray-200 bg-white bg-opacity-90 backdrop-blur backdrop-filter transition-opacity duration-200 dark:border-gray-800 dark:bg-gray-950 lg:block ${
          top ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="mx-auto h-full max-w-screen-2xl">
          <div className="ml-64 flex h-full items-center space-x-2 px-8 text-sm xl:ml-72 2xl:ml-80">
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
