---
title: Full tutorial
---

This tutorial will get you comfortable with the basics of Contentlayer by showing how we can quickly build a blog site using Next.js.

## 1. Setup Project

Just to demonstrate how quickly we can start working, let's start with a new blank Next.js project.

### New Next.js App

Create a new Next.js project.

    npx create-next-app contentlayer-example

That command will place the project in a `contentlayer-example` directory. Change into that directory.

    cd contentlayer-example

### Add Tailwind

If you'd like to see some styling as we go without much extra effort, [follow these instructions](https://tailwindcss.com/docs/guides/nextjs) to add Tailwind to your project.

## 2. Install Contentlayer

Install Contentlayer and the Next.js plugin.

    npm install contentlayer next-contentlayer

To hook Contentlayer into the `next dev` and `next build` processes, you'll want to wrap the Next.js configuration using the `withContentlayer` method.

Create a new file called `next.config.mjs` in the root of your project, and add the following content.

```js
// next.config.mjs

import { withContentlayer } from 'next-contentlayer'

export default withContentlayer()({})
```

## 3. Define Post Schema

Now that we have everything installed, we can begin to define our document schema. A document is an individual piece of content that Contentlayer transforms into data you can use in your components.

Because we're building a simple blog site, let's define a single document type called `Post`. Create a file `contentlayer.config.js` in the root of your project, and add the following content.

```js
// contentlayer.config.js

import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.md`,
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (doc) => `/posts/${doc._raw.flattenedPath}`,
    },
  },
}))

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
})
```

This configuration specifies a single document type called `Post`. These documents are expected to be `.md` files that live within a `posts` directory in your project. And data objects generated from these files will have the following properties:

- `title`: String pulled from the file's frontmatter.
- `date`: JavaScript `Date` object, pulled from the file's frontmatter.
- `body`: An object that contains the `raw` content from the markdown file and the converted `html` string. (This is built into Contentlayer by default and does not have to be defined.)
- `url`: A string that takes the name of the file (without the extension) and prepends `/posts/` to it, thus defining that path at which that content will be available on your site. (More on this soon.)

## 4. Add Post Layout

Let's add some content and then build out a basic view for each post in the blog.

### Add Post Content

Create a few markdown files in a `posts` directory and add some content to those files. Here's an example of what a post file at `posts/lorem-ipsum.md` might look like:

```md
---
title: Lorem Ipsum
date: 2021-12-24
---

Ullamco et nostrud magna commodo nostrud occaecat quis pariatur id ipsum. Ipsum consequat enim id excepteur consequat nostrud esse esse fugiat dolore. Reprehenderit occaecat exercitation non cupidatat in eiusmod laborum ex eu fugiat aute culpa pariatur. Irure elit proident consequat veniam minim ipsum ex pariatur.

Mollit nisi cillum exercitation minim officia velit laborum non Lorem adipisicing dolore. Labore commodo consectetur commodo velit adipisicing irure dolore dolor reprehenderit aliquip. Reprehenderit cillum mollit eiusmod excepteur elit ipsum aute pariatur in. Cupidatat ex culpa velit culpa ad non labore exercitation irure laborum.
```

### Build Post Layout

Now let's build a layout for individual posts. We'll keep it super simple, though it'll still be quite a bit of code.

Let's first add a library to help us with formatting the date.

    npm install date-fns

Then you can add the following code to `pages/posts/[slug].jsx`

```jsx
import Head from 'next/head'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { allPosts } from '.contentlayer/data'

export async function getStaticPaths() {
  const paths = allPosts.map((post) => post.url)
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)
  return {
    props: {
      post,
    },
  }
}

const PostLayout = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article className="max-w-2xl mx-auto py-16">
        <div className="text-center mb-6">
          <Link href="/">
            <a className="text-sm text-blue-700 uppercase font-bold text-center">Home</a>
          </Link>
        </div>
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-1">{post.title}</h1>
          <time dateTime={post.date} className="text-sm text-gray-600">
            {format(parseISO(post.date), 'LLLL d, yyyy')}
          </time>
        </div>
        <div className="cl-post-body" dangerouslySetInnerHTML={{ __html: post.body.html }} />
      </article>
    </>
  )
}

export default PostLayout
```

Notice that we're importing data from `.contentlayer/data`. This is the beauty of Contentlayer. It has already loaded and shaped our date and keeps the logic in `getStaticPaths()` and `getStaticProps()` nice and simple.

### Run the App

Now you're ready to take it for a spin. Fire up the Next.js dev server.

    npm run dev

And visit localhost:3000 in your browser. You'll see the default Next.js landing page. But if you navigate directly to a post, you should see the post content.

For example, if you had a file at `posts/lorem-ipsum.md`, you can navigate to localhost:3000/posts/lorem-ipsum and should see the content for that post.

![Post Layout](/images/post-layout.png)

## 5. Add Post Feed

To wrap this up, let's replace the default home page with a listing of all the posts and links to the individual post pages.

TODO

## Wrap Up

🎉 You did it! 🎉

You now have a simple blog site with Next.js and Contentlayer. Now you can dig in deeper to build great content with Contentlayer.

Explore the rest of the docs or [join our community](/community) to get help and to keep up with all things Contentlayer.
