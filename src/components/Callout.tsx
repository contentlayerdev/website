import { FC } from 'react'
import { Icon } from './Icon'

export const Callout: FC = ({ children }) => {
  return (
    <div className="rounded-lg border border-violet-100 bg-violet-50 dark:border-violet-900/50 dark:bg-violet-900/20">
      <div className="flex space-x-4 p-6 py-4 font-semibold text-violet-600 dark:text-violet-400">
        <div className="mt-1 w-5 shrink-0 text-violet-500 dark:text-violet-700">
          <Icon name="exclamation" />
        </div>
        <div className="prose-a:font-semibold">{children}</div>
      </div>
    </div>
  )
}
