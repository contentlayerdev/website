import { FC } from 'react'
import { allPosts, Post, RelatedPost } from 'contentlayer/generated'
import { Card } from '../common/Card'
import { BlogPreview } from './BlogPreview'

export const RelatedPosts: FC<{ posts: RelatedPost[] }> = ({ posts }) => {
  return (
    <div>
      <h2 className="mb-8 mt-12 text-2xl font-semibold text-slate-800 dark:text-slate-200">Related Posts</h2>
      <div className="not-prose space-y-8">
        {posts.map(({ slug }, index) => {
          const post = allPosts.find((_) => _.slug === slug)!
          return <BlogPreview key={index} post={post} />
        })}
      </div>
    </div>
  )
}
