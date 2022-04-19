import { FC } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { Card } from '../common/Card'
import { useRouter } from 'next/router'

export type CodeSnippet = { file: string; content: string; lines: number }

export const CodeWindow: FC<{
  snippets: readonly CodeSnippet[]
}> = ({ snippets }) => {
  const router = useRouter()
  return (
    <Card shadow className={router.pathname.split('/')[1] == 'blog' ? 'mb-8' : 'mb-0'}>
      <Tabs.Root defaultValue={snippets[0].file}>
        <Tabs.List aria-label="Select file to view" className="flex flex-nowrap overflow-x-auto">
          <div className="flex h-10 items-center space-x-1.5 border-r border-b border-gray-100 px-4 dark:border-gray-900">
            <span className="h-3 w-3 rounded-full bg-red-400 dark:bg-slate-600" />
            <span className="h-3 w-3 rounded-full bg-amber-400 dark:bg-slate-600" />
            <span className="h-3 w-3 rounded-full bg-green-400 dark:bg-slate-600" />
          </div>
          {snippets.map(({ file }, index) => (
            <Tabs.Trigger
              key={index}
              value={file}
              className="relative flex h-10 shrink-0 items-center border-r border-b border-gray-100 px-4 text-sm text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-300 radix-state-active:border-b-transparent radix-state-active:bg-white dark:border-gray-900 dark:text-slate-400 dark:focus:ring-violet-900 dark:radix-state-active:bg-[#0d1116]"
            >
              {file}
            </Tabs.Trigger>
          ))}
          <div className="grow border-b border-gray-100 dark:border-gray-900"></div>
        </Tabs.List>
        <div className="max-h-[600px] overflow-y-scroll">
          {snippets.map(({ file, content, lines }, index) => (
            <Tabs.Content key={index} value={file} className="flex overflow-y-hidden focus:outline-none">
              <div className="w-8 shrink-0 grow-0 bg-white pt-[19px] pb-3 text-right font-mono text-sm leading-none text-slate-300 dark:bg-[#0d1116] dark:text-slate-700">
                {[...new Array(lines)].map((v, index) => (
                  <div key={index} className="h-[20px] px-2">
                    {index + 1}
                  </div>
                ))}
              </div>
              <ScrollArea.Root className="w-full overflow-hidden bg-white dark:bg-[#0D1116]">
                <ScrollArea.Viewport>
                  <div
                    className={`text-[13] not-prose ${
                      router.pathname.split('/')[1] == 'blog' ? '-mt-[30px]' : '-mt-[20px]'
                    } -mb-[40px]`}
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar orientation="horizontal">
                  <ScrollArea.Thumb className="relative" />
                </ScrollArea.Scrollbar>
                <ScrollArea.Corner />
              </ScrollArea.Root>
            </Tabs.Content>
          ))}
        </div>
      </Tabs.Root>
    </Card>
  )
}
