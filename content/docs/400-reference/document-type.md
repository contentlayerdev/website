---
title: defineDocumentType
---

## Usage

```js
const Doc = defineDocumentType(() => ({
  name: "Doc",
  filePathPattern: "**/*.md",
  bodyType: "md",
  fields: {
    title: {
      type: "string",
    },
  },
}));
```

## Options

### `name` (required)

Name of the document. This defines the types and functions that are generated for documents of this type.

### `fields`

Field definitions. This is what defines the shape of your document. See [field definitions](/docs/field-definitions) for more information.

### `description`

TODO

### `computedFields`

Computed fields can be calculated on the fly rather than being read directly from the content source.

They follow a similar pattern to `fields`, except that each field takes a required `resolve` option, which is a function that resolves the value of the field. The function receives a single argument, the document object.

Here's an example that introspects the document for its path and applies a `url_path` property to the document.

```js
import { urlFromFilePath } from "../utils";

export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `**/*.md`,
  fields: {
    // ...
  },
  computedFields: {
    url_path: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace(/pages\/?/, ""),
    },
  },
  extensions: {},
}));
```

### `filePathPattern`

Path is relative to the `contentDirPath` config. Use glob patterns to target a specific subset of documents.

This can also point to a single document.

### `bodyType` (default: `markdown`)

How the main content area of the file should be parsed. It is treated as markdown by default.

### `isSingleton` (default: `false`)

By default, Contentlayer will grab any files matching the `filePathPattern`. Setting the document type to be a singleton means that Contentlayer will grab a single file and export a single object for use in your project.

```js
defineDocumentType(() => ({
  name: "GlobalConfig",
  filePathPattern: `config/global.yaml`,
  isSingleton: true,
  fields: {
    title: {
      type: "string",
      description: "The title of the site",
      required: true,
    },
  },
}));
```

### `extensions`

TODO
