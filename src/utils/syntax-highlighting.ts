import { renderCodeToHTML, runTwoSlash, createShikiHighlighter, UserConfigSettings } from 'shiki-twoslash'
type Highlighter = Awaited<ReturnType<typeof createShikiHighlighter>>

let highlighter: Highlighter | undefined = undefined

export const snippetToHtml = async (snippet: string) => {
  const themeName = 'light-plus'

  if (!highlighter) {
    highlighter = await createShikiHighlighter({ theme: themeName })
  }

  const settings: UserConfigSettings = {
    includeJSDocInHover: true,
    defaultCompilerOptions: { strict: false, noImplicitAny: false },
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
