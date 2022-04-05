import { FC, useState } from 'react'
import * as Tooltip from '@radix-ui/react-tooltip'

export const Dashed: FC<{ label: string; tooltip: string }> = ({ label, tooltip }) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false)

  return (
    <Tooltip.Root delayDuration={100} open={showTooltip} onOpenChange={(open) => setShowTooltip(open)}>
      <Tooltip.Trigger className="inline-block cursor-text border-b border-dashed border-gray-300 dark:border-gray-500">
        <span onClick={() => setShowTooltip(true)}>{label}</span>
      </Tooltip.Trigger>
      <Tooltip.Content
        sideOffset={10}
        className="rounded bg-gray-800 px-3 py-1.5 text-sm text-slate-100 shadow-xl shadow-white dark:bg-violet-200 dark:text-violet-900 dark:shadow-black"
      >
        {tooltip}
        <Tooltip.Arrow className="mx-1 fill-current text-gray-800 dark:text-violet-200" />
      </Tooltip.Content>
    </Tooltip.Root>
  )
}
