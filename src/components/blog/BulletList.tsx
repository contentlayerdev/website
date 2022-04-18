import { Icon } from '../common/Icon'

export const BulletList: React.FC<React.PropsWithChildren<{ columns?: number | 1 }>> = ({ columns, children }) => {
  return <ul className={`mb-4 mt-12 grid grid-cols-1 gap-x-4 gap-y-2 pl-0 md:grid-cols-${columns}`}>{children}</ul>
}

export const BulletListItem: React.FC<React.PropsWithChildren<{ type: 'check' | 'cross' }>> = ({ type, children }) => {
  return (
    <li className="mt-[-1.5rem] flex max-w-2xl items-start space-x-4">
      {type === 'check' && (
        <span className="text-green-500" style={{ flex: '0 0 1.5rem', marginTop: '.25rem' }}>
          <Icon name="check-circle-outline" />
        </span>
      )}
      {type === 'cross' && (
        <span className="text-red-500" style={{ flex: '0 0 1.5rem', marginTop: '.25rem' }}>
          <Icon name="cross-circle-outline" />
        </span>
      )}
      <span className="leading-normal">{children}</span>
    </li>
  )
}
