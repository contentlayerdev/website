import { FC } from 'react'
import { allPosts, Post, RelatedPost } from 'contentlayer/generated'
import { Card } from '../common/Card'
import { BlogPreview } from './BlogPreview'

export const RelatedPosts: FC<{ posts: RelatedPost[] }> = ({ posts }) => {
  return (
    <div>
      <h2 className="mb-8 text-2xl font-semibold text-slate-800 dark:text-slate-200">Related Posts</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {posts.map(({ slug }, index) => {
          const post = allPosts.find((_) => _.slug === slug)!
          return (
            <Card key={index} className="not-prose p-8">
              <BlogPreview post={post} />
            </Card>
          )
        })}
      </div>
    </div>
  )
}
