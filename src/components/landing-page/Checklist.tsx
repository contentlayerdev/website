import { FC, ReactNode } from 'react'
import classnames from 'classnames'
import { Icon } from '../common/Icon'

export const Checklist: FC<{ items: ReactNode[]; className?: string }> = ({ items, className }) => {
  return (
    <ul className={classnames('space-y-2 text-slate-700 dark:text-slate-300', className)}>
      {items.map((item, index) => (
        <li key={index} className="flex space-x-3">
          <div className="pt-1">
            <Icon name="check" />
          </div>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
