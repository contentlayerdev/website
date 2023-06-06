// TODO remove eslint-disable when fixed https://github.com/import-js/eslint-plugin-import/issues/1810
// eslint-disable-next-line import/no-unresolved
import { makeSource } from '@contentlayer/source-files'
import highlight from 'rehype-highlight'
import { contentDirPath } from './src/contentlayer/utils'
import { validateDuplicateIds } from './src/utils/validate-duplicate-ids'
import * as documentTypes from './src/contentlayer'

export default makeSource({
  contentDirPath,
  documentTypes,
  mdx: { rehypePlugins: [highlight] },
  onSuccess: async (importData) => {
    const { allDocs } = await importData()
    await validateDuplicateIds(allDocs)
  },
})
