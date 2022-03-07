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

  return html.replace('./assets/contentlayer-generated', 'contentlayer/generated')
}
