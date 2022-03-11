import { FC } from 'react'
import classnames from 'classnames'
import { Icon, IconName } from '../components/Icon'

const themeClasses = {
  primary:
    'bg-violet-600 text-violet-100 border-violet-700 hover:bg-violet-500 dark:bg-violet-700 dark:border-violet-700 dark:hover:bg-violet-600 dark:hover:border-violet-600',
  secondary:
    'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 dark:text-gray-300 dark:border-gray-800 dark:hover:bg-gray-800',
}

export const Button: FC<{ label: string; action: () => void; theme?: 'primary' | 'secondary'; icon?: IconName }> = ({
  label,
  action,
  theme = 'primary',
  icon,
}) => {
  const sharedClasses =
    'px-6 py-2 flex justify-center items-center space-x-3 rounded-md border font-medium focus:outline-none focus:ring-2 focus:ring-violet-300 dark:focus:ring-violet-900'

  return (
    <button className={classnames(sharedClasses, themeClasses[theme])} onClick={action} aria-label={label}>
      <span>{label}</span>
      {icon && (
        <span className="w-5">
          <Icon name={icon} />
        </span>
      )}
    </button>
  )
}
