---
title: Field Types (Local)
nav_title: Field Types
---

Field definitions specify the expected shape and behavior of your content. They tell Contentlayer how to parse each property in a content object into data that your application can use.

All fields share the same basic options, while other options are available depending on the type of field. See below for more information.

## Shared Options

The name of the field is defined as the key of the definition object (see example). All field definitions have the following options available:

- `type` (`string`, required): The name of the type.
- `required` (`boolean`, default: `false`): Whether to validate the existence of the field when parsing content.
- `description` (`string`): A short description to editors how the field is to be used.

The field type then dictates all other available options. Look below for more information.

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

## `boolean`

A boolean field can have either a `true` or `false` value.

**Options:**

- `default` (`string`): A default value for the field if it is empty.

**Example:**

```js
defineDocumentType(() => ({
  // ...
  fields: {
    isActive: {
      type: 'boolean',
      default: false,
    },
  },
}))
```

## `date`

Date fields return an instance of `Date`.

**Options:**

- `default` (`string`): A default value for the field if it is empty.

**Example:**

```js
defineDocumentType(() => ({
  // ...
  fields: {
    publishAt: {
      type: 'date',
    },
  },
}))
```

## `enum`

Enums are a specialized string field, where the string must match one of the defined options.

**Options:**

- `default` (`string`): A default value for the field if it is empty.
- `options` (`string[]`): An array of acceptable options for the field.

**Example:**

```js
defineDocumentType(() => ({
  // ...
  fields: {
    theme: {
      type: 'enum',
      options: ['light', 'dark'],
      default: 'dark',
    },
  },
}))
```

## `json`

JSON fields are open-ended and can store data of any valid JSON structure.

**Options:**

- `default` (`string`): A default value for the field if it is empty.

**Example:**

```js
defineDocumentType(() => ({
  // ...
  fields: {
    options: {
      type: 'json',
    },
  },
}))
```

## `list`

TODO

**Options:**

- `default` (`string`): A default value for the field if it is empty.

**Example:**

```js
defineDocumentType(() => ({
  // ...
  fields: {
    title: {
      type: 'list',
      required: true,
    },
  },
}))
```

## `markdown`

TODO

**Options:**

- `default` (`string`): A default value for the field if it is empty.

**Example:**

```js
defineDocumentType(() => ({
  // ...
  fields: {
    title: {
      type: 'markdown',
      required: true,
    },
  },
}))
```

## `mdx`

TODO

**Options:**

- `default` (`string`): A default value for the field if it is empty.

**Example:**

```js
defineDocumentType(() => ({
  // ...
  fields: {
    title: {
      type: 'mdx',
      required: true,
    },
  },
}))
```

## `nested`

TODO

**Options:**

- `default` (`string`): A default value for the field if it is empty.

**Example:**

```js
defineDocumentType(() => ({
  // ...
  fields: {
    title: {
      type: 'nested',
      required: true,
    },
  },
}))
```

## `number`

**Options:**

- `default` (`string`): A default value for the field if it is empty.

**Example:**

```js
defineDocumentType(() => ({
  // ...
  fields: {
    count: {
      type: 'number',
      default: 0,
    },
  },
}))
```

## `reference`

TODO

**Options:**

- `default` (`string`): A default value for the field if it is empty.

**Example:**

```js
defineDocumentType(() => ({
  // ...
  fields: {
    title: {
      type: 'reference',
      required: true,
    },
  },
}))
```

## `string`

**Options:**

- `default` (`string`): A default value for the field if it is empty.

**Example:**

```js
defineDocumentType(() => ({
  // ...
  fields: {
    title: {
      type: 'string',
      required: true,
    },
  },
}))
```
