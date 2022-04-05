import { FC } from 'react'
import classnames from 'classnames'

const themeClasses = {
  default: 'text-slate-500 dark:text-slate-400 border border-slate-400/70 dark:border-slate-600',
  primary: 'text-purple-400 dark:text-purple-600 border border-purple-300 dark:border-purple-800',
}

export const Label: FC<{ text: string; theme?: 'default' | 'primary' }> = ({ text, theme = 'default' }) => {
  const sharedClasses =
    'inline-block align-middle px-1.5 leading-4 rounded tracking-wide [font-size:10px] font-medium whitespace-nowrap'

  return <div className={classnames(sharedClasses, themeClasses[theme])}>{text}</div>
}
