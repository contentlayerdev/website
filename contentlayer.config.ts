import { makeSource } from 'contentlayer/source-files'
import highlight from 'rehype-highlight'

import * as documentTypes from './src/contentlayer'

export default makeSource({
  contentDirPath: 'content',
  documentTypes,
  markdown: { rehypePlugins: [highlight] },
})
