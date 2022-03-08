import { FC } from 'react'
import classnames from 'classnames'

const themeClasses = {
  default: 'text-gray-400 dark:text-gray-500 border border-gray-300 dark:border-gray-600',
  primary: 'text-purple-400 dark:text-purple-600 border border-purple-300 dark:border-purple-800',
}

export const Label: FC<{ text: string; theme?: 'default' | 'primary' }> = ({ text, theme = 'default' }) => {
  const sharedClasses = 'inline-block leading-5 align-middle px-2 rounded tracking-wide [font-size:10px] font-medium'

  return <div className={classnames(sharedClasses, themeClasses[theme])}>{text}</div>
}
