import { FC } from 'react'
import { Icon } from '../common/Icon'

export const BulletList: FC<{ type: 'check' | 'cross'; columns?: number | 1; items: string[] }> = ({
  type,
  columns,
  items,
}) => {
  return (
    <ul className={`my-8 grid grid-cols-1 gap-4 rounded-lg bg-[#111727] p-8 md:gap-8 md:p-16 md:grid-cols-${columns}`}>
      {items.map((item, index) => (
        <li key={index} className="flex items-center max-w-2xl mx-auto space-x-4">
          {type === 'check' && (
            <span className="text-green-500 w-7">
              <Icon name="check-circle-outline" />
            </span>
          )}
          {type === 'cross' && (
            <span className="text-red-500 w-7">
              <Icon name="cross-circle-outline" />
            </span>
          )}
          <span className="text-xl text-white">{item}</span>
        </li>
      ))}
    </ul>
  )
}
