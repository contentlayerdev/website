---
title: Field Types (Local)
nav_title: Field Types
---

Additional field type options are available based on the chosen type. Here are the expanded details.

### `boolean`

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

### `date`

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

### `enum`

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

### `json`

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

### `list`

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

### `markdown`

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

### `mdx`

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

### `nested`

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

### `number`

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

### `reference`

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

### `string`

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
