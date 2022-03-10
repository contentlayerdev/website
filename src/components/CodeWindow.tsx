import { FC } from 'react'
import { type CodeSnippet } from './LandingPage/HowItWorks'
import * as Tabs from '@radix-ui/react-tabs'

export const CodeWindow: FC<{
  snippets: readonly CodeSnippet[]
}> = ({ snippets }) => {
  return (
    <div className="bg-gray-50 border border-gray-100 shadow-lg shadow-gray-100 rounded-2xl overflow-hidden dark:bg-gray-900/50 dark:border-gray-900 dark:shadow-gray-900">
      <Tabs.Root defaultValue={snippets[0].file}>
        <Tabs.List aria-label="Select file to view" className="flex">
          <div className="h-10 flex items-center px-4 space-x-1.5 border-r border-b border-gray-100 dark:border-gray-900">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-amber-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          {snippets.map(({ file }, index) => (
            <Tabs.Trigger
              key={index}
              value={file}
              className="h-10 flex items-center px-4 text-gray-500 border-r border-b border-gray-100 radix-state-active:border-b-transparent radix-state-active:bg-white dark:border-gray-900 dark:text-gray-400 dark:radix-state-active:bg-[#0d1116]"
            >
              {file}
            </Tabs.Trigger>
          ))}
          <div className="grow border-b border-gray-100 dark:border-gray-900"></div>
        </Tabs.List>
        {snippets.map(({ file, content, lines }, index) => (
          <Tabs.Content key={index} value={file} className="overflow-y-hidden flex">
            <div className="w-8 shrink-0 grow-0 text-right py-[19px] bg-white leading-none text-sm text-gray-300 font-mono dark:bg-[#0d1116] dark:text-gray-700">
              {[...new Array(lines)].map((v, index) => (
                <div key={index} className="px-2 h-[20px]">
                  {index + 1}
                </div>
              ))}
            </div>
            <div className="text-[13] -mt-[20px] -mb-[36px]" dangerouslySetInnerHTML={{ __html: content }} />
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </div>
  )
}
