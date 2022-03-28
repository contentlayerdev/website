import { FC } from 'react'

export const Callout: FC = ({ children }) => {
  return (
    <div className="flex overflow-hidden rounded-lg border border-violet-300 bg-violet-50 dark:bg-gray-800">
      <div className="w-1 shrink-0 bg-violet-300" />
      <div className="p-4 px-6 font-semibold text-violet-600">{children}</div>
    </div>
  )
}
