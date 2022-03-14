import { FC } from 'react'
import * as Tooltip from '@radix-ui/react-tooltip'

export const Dashed: FC<{ label: string; tooltip: string }> = ({ label, tooltip }) => {
  return (
    <Tooltip.Root delayDuration={100}>
      <Tooltip.Trigger className="inline-block border-b border-dashed border-gray-300 dark:border-gray-500 cursor-text">
        {label}
      </Tooltip.Trigger>
      <Tooltip.Content
        sideOffset={10}
        className="bg-gray-800 rounded text-slate-100 text-sm px-3 py-1.5 shadow-xl shadow-white dark:shadow-black"
      >
        {tooltip}
        <Tooltip.Arrow fill="#1f2937" />
      </Tooltip.Content>
    </Tooltip.Root>
  )
}
