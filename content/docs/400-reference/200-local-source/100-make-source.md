---
title: makeSource (Local)
nav_title: makeSource
---

`makeSource` provides Contentlayer with the schema and configuration for your application.

## Usage

The code calling `makeSource` should be placed in `contentlayer.config.js`.

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

**Example:**

```js
export default makeSource({
  contentDirPath: "content",
});
```

This would load content from a `content` directory in your project.

### `documentTypes` (required)

Your schema definitions for your project. See [`defineDocumentType`](/docs/document-type) for usage.

### `markdown`

Specify [remark](https://remark.js.org/) and [rehype](https://github.com/rehypejs/rehype) plugins.

**Options:**

- `remarkPlugins`
- `rehypePlugins`

**Example:**

Here's an example that adds syntax highlighting.

```js
import { makeSource } from "contentlayer/source-files";
import highlight from "rehype-highlight";

export default makeSource({
  // ...
  markdown: { rehypePlugins: [highlight] },
});
```

### `mdx`

Follows the same pattern as the `markdown` option, but for MDX processing.

**Options:**

- `remarkPlugins`
- `rehypePlugins`

**Example:**

```js
import { makeSource } from "contentlayer/source-files";
import highlight from "rehype-highlight";

export default makeSource({
  // ...
  mdx: { rehypePlugins: [highlight] },
});
```

### `fieldOptions`

Provides the ability to manipulate how fields are written when parsing the content source.

**Options:**

- `bodyFieldName` (default: `body`): Name of the field containing the body/content extracted when the body type is `markdown` or `mdx`.
- `typeFieldName` (default: `type`): Name of the field containing the name of the document type (or nested document type).

**Example:**

```js
export default makeSource({
  fieldOptions: {
    bodyFieldName: "content",
    typeFieldName: "__typename",
  },
});
```

### `date`

Specify date options. Currently only supports:

- `timezone`: Specify the timezone when parsing dates. Based on [@marsnusw/date-fns-tz](https://github.com/marnusw/date-fns-tz#zonedtimetoutc).
