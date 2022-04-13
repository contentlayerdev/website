import React from 'react'
import { Icon } from './Icon'

export const Callout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className="bg-violet-50 rounded-lg border border-violet-100 dark:border-violet-900/50 dark:bg-violet-900/20">
      <div className="flex p-6 py-4 space-x-4 text-violet-600 dark:text-violet-300">
        <div className="mt-1 w-5 text-violet-500 shrink-0 dark:text-violet-400">
          <Icon name="exclamation" />
        </div>
        <div className="prose-a:font-semibold">{children}</div>
      </div>
    </div>
  )
}
