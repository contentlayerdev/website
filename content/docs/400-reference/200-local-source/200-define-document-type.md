---
title: defineDocumentType (Local)
nav_title: defineDocumentType
---

`defineDocumentType` defines the schema for one particular document type, often referred to as a model or content type.

Document type definitions are used within the options for [`makeSource`](/docs/reference/local-source/make-source), which is how the definition is passed onto Contentlayer.

## Usage

```js
const Doc = defineDocumentType(() => ({
  name: 'Doc',
  filePathPattern: '**/*.md',
  bodyType: 'md',
  fields: {
    title: {
      type: 'string',
    },
  },
}))
```

## Options

### `name` (required)

Name of the document. This defines the types and functions that are generated for documents of this type.

```js
const Doc = defineDocumentType(() => ({
  name: "Doc",
  // ...
})
```

In the usage example, the `name` was `Doc`, which would generate a data object `allDocs` representing the collection of all matching documents (see `filePathPattern`). And it would add a type definition for `Doc`, representing the shape of the data object created from your content.

### `fields`

Field definitions. This is what defines the shape of your document. See [field types](/docs/reference/local-source/field-types) for more information.

**Options:**

The name of the field is defined as the key of the definition object (see example). All field definitions have the following options available:

- `type` (`string`, required): The name of the type.
- `required` (`boolean`, default: `false`): Whether to validate the existence of the field when parsing content.
- `description` (`string`): A short description to editors how the field is to be used.

The field type then dictates all other available options. See _Field Types_ below for more information.

**Example:**

This is a type definition that defines a single field with the name `title` and of type `string` that is not required.

```js
defineDocumentType(() => ({
  // ...
  fields: {
    title: { type: 'string' },
  },
}))
```

### `description`

Provides a description for the generated type definition.

### `computedFields`

Computed fields can be calculated on the fly rather than being read directly from the content source.

They follow a similar pattern to `fields` (see above), except that each field takes a required `resolve` option, which is a function that resolves the value of the field. The function receives a single argument, the document object.

Here's an example that introspects the document for its path and applies a `url_path` property to the document.

```js
import { urlFromFilePath } from '../utils'

export const Page = defineDocumentType(() => ({
  // ...
  fields: {
    // ...
  },
  computedFields: {
    url_path: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace(/pages\/?/, ''),
    },
  },
}))
```

### `filePathPattern`

Path is relative to the `contentDirPath` specified in the `makeSource` options. Use glob patterns to target a specific subset of documents.

This can also point to an individual file, which would create a singleton document type. See the `isSingleton` option for more information.

**Example:**

This would recursively retrieve all files with a `.md` extension in the `content` directory of your project.

```js
const Doc = defineDocumentType(() => ({
  filePathPattern: '**/*.md',
  // ...
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Doc],
})
```

### `bodyType` (default: `markdown`)

How the main content area of the file should be parsed. It is treated as markdown by default.

**Options:**

- `markdown`
- `mdx`
- `none`

### `isSingleton` (default: `false`)

By default, Contentlayer will grab any files matching the `filePathPattern`. Setting the document type to be a singleton means that Contentlayer will grab a single file and export a single object for use in your project.

**Example:**

In this example, Contentlayer would export a `globalConfig` data object with the content from `config/global.yaml` (inside the main content directory). The type definition for the object would match the name (`GlobalConfig`), as in non-singleton types.

```js
defineDocumentType(() => ({
  name: 'GlobalConfig',
  filePathPattern: `config/global.yaml`,
  isSingleton: true,
  // ...
}))
```
