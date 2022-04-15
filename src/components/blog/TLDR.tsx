import { Icon } from '../common/Icon'

export const TLDR: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className="flex flex-col">
      <div
        className={`mb-12 grow rounded-2xl border border-gray-100 bg-gray-50 p-6 py-4
        dark:border-gray-800 dark:bg-gray-900`}
      >
        <div className="-mt-10 mb-4 block w-12 rounded-full bg-white dark:bg-gray-950">
          <div className="h-12 w-12 rounded-full border border-violet-200 bg-violet-100 p-2.5 text-violet-600 dark:border-violet-900 dark:bg-violet-900/50 dark:text-violet-500">
            <Icon name="info" />
          </div>
        </div>

        <div className="text-md leading-normal text-slate-500 dark:text-slate-400">{children}</div>
      </div>
    </div>
  )
}
