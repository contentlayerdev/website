import { renderCodeToHTML, runTwoSlash, createShikiHighlighter, UserConfigSettings } from 'shiki-twoslash'
type Highlighter = Awaited<ReturnType<typeof createShikiHighlighter>>

let highlighter: Highlighter | undefined = undefined

export const snippetToHtml = async (snippet: string) => {
  const themeName = 'github-light'

  if (!highlighter) {
    highlighter = await createShikiHighlighter({ theme: themeName })
  }

  const settings: UserConfigSettings = {
    includeJSDocInHover: true,
    defaultCompilerOptions: {
      strict: false,
      noImplicitAny: false,
      // paths: {
      //   'contentlayer/generated': ['./.contentlayer/generated'],
      // },
    },

    // TODO make `contentlayer/generated` work
    // fsMap: new Map(
    //   Object.entries({
    //     'contentlayer/generated': generatedTypes,
    //   }),
    // ),
  }

  const twoslash = runTwoSlash(snippet, 'tsx', settings)
  const html = renderCodeToHTML(
    twoslash.code,
    'tsx',
    { twoslash: true },
    { ...settings, themeName },
    highlighter,
    twoslash,
  )

  return html
}

const generatedTypes = `
import { Doc, GlobalConfig, Page, DocumentTypes } from './types'

export type * from './types'

export declare const allDocs: Doc[]
export declare const globalConfig: GlobalConfig
export declare const allPages: Page[]

export declare const allDocuments: DocumentTypes[]
`
