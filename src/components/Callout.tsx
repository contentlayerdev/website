import { FC } from 'react'

export const Callout: FC = ({ children }) => {
  return (
    <div className="flex overflow-hidden rounded-lg border border-violet-200 bg-violet-50 dark:bg-gray-800">
      <div className="w-1 shrink-0 bg-violet-500" />
      <div className="p-4 px-6 font-semibold text-violet-600">{children}</div>
    </div>
  )
}
