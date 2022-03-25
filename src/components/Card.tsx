import { FC, ReactNode } from 'react'
import classNames from 'classnames'

export const Card: FC<{ children: ReactNode; className?: string; shadow?: boolean; dark?: boolean }> = ({
  children,
  className,
  shadow = false,
  dark = false,
}) => {
  return (
    <div
      className={classNames(
        'border rounded-2xl overflow-hidden',
        dark ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-100 dark:bg-gray-900 dark:border-gray-800',
        shadow && `shadow-lg ${dark ? 'shadow-gray-900' : 'shadow-gray-100 dark:shadow-gray-900'}`,
        className,
      )}
    >
      {children}
    </div>
  )
}
