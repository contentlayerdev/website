---
title: F.A.Q.
---

## Why generates Contentlayer a `node_modules/.contentlayer` folder?

- Benefits
  - Most developers already have `node_modules` in their `.gitignore` file
  - Can `import { Something } from '.contentlayer/data` from anywhere in your app avoid deep relative paths (e.g. `../../`)
  - Works out of the box with any kind of tooling (e.g. Next.js, TypeScript, ...)