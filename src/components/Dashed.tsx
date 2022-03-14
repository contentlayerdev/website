import { FC } from 'react'
import * as Tooltip from '@radix-ui/react-tooltip'

export const Dashed: FC<{ label: string; tooltip: string }> = ({ label, tooltip }) => {
  return (
    <Tooltip.Root delayDuration={100}>
      <Tooltip.Trigger className="inline-block border-b border-dashed border-gray-300 dark:border-gray-500">
        {label}
      </Tooltip.Trigger>
      <Tooltip.Content sideOffset={10} className="bg-gray-700 rounded text-slate-100 text-sm px-1.5 py-0.5 shadow-md">
        {tooltip}
        <Tooltip.Arrow fill="#374151" />
      </Tooltip.Content>
    </Tooltip.Root>
  )
}
