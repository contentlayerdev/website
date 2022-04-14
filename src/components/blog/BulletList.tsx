import { FC } from 'react'
import { Icon } from '../common/Icon'

export const BulletList: FC<{ type: 'check' | 'cross'; columns?: number | 1; items: string[] }> = ({
  type,
  columns,
  items,
}) => {
  return (
    <ul className={`mt-8 grid grid-cols-1 gap-4 rounded-lg bg-[#111727] p-8 md:gap-8 md:p-16 md:grid-cols-${columns}`}>
      {items.map((item, index) => (
        <li key={index} className="mx-auto flex max-w-2xl items-center space-x-4">
          {type === 'check' && (
            <span className="w-7 text-green-500">
              <Icon name="check-circle-outline" />
            </span>
          )}
          {type === 'cross' && (
            <span className="w-7 text-red-500">
              <Icon name="cross-circle-outline" />
            </span>
          )}
          <span className="text-xl text-white">{item}</span>
        </li>
      ))}
    </ul>
  )
}
