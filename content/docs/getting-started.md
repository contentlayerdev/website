---
title: Getting Started
---

Using the [demo](https://github.com/vercel/next-learn-starter/tree/master/demo) from Next.js Learn tutorial. For this guide, we should start from scratch.

```jsx
npx create-next # or whatever this command is
```

Install dependencies

```
npm install contentlayer --save-dev
```

Add markdown files to some directory.

Add `contentlayer.config.js`

```jsx
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import highlight from "rehype-highlight";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.md`,
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true,
    },
    date: {
      type: "date",
      description: "The date of the post",
      required: true,
    },
  },
}));

export default makeSource({
  contentDirPath: "posts",
  documentTypes: [Post],
});
```

Build content.

```jsx
./node_modules/.bin/contentlayer build
```

Look into the `node_modules/.contentlayer` directory and walk through some of the basics.

Start next server

```jsx
npm run dev
```

1. Pull all posts into the home page
1. Then render a page for every post
1. Maybe add a markdown plugin?
