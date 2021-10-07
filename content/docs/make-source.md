---
title: makeSource
---

## Usage

```ts
// contentlayer.config.js
import { makeSource } from "contentlayer/source-files";

export default makeSource({
  /* options */
});
```

## Options

### `contentDirPath` (required)

Path to where the content lives, relative to the root of your project.

Example:

```js
export default makeSource({
  contentDirPath: "content",
});
```

This would load content from a `content` directory in your project.

### `documentTypes` (required)

Your schema definitions for your project. See [`defineDocumentType`](/docs/document-type) for usage.

### `markdown`

Options for the [remark](https://remark.js.org/) markdown parser.

Here's an example that adds syntax highlighting.

```js
import { makeSource } from "contentlayer/source-files";
import highlight from "rehype-highlight";

export default makeSource({
  // ...
  markdown: { rehypePlugins: [highlight] },
});
```

### `mdx?`

TODO

### `fieldOptions?`

TODO

### `extensions?`

TODO
