import { FC, Dispatch, SetStateAction } from 'react'
import { Root, Item } from '@radix-ui/react-toggle-group'
import { Root as Tooltip, Trigger as TooltipTrigger, Content as TooltipContent } from '@radix-ui/react-tooltip'

export type Tab = {
  label: string
  disabled: boolean
}

export const ToggleGroup: FC<{
  tabs: Tab[]
  selectedTab: string
  setSelectedTab: Dispatch<SetStateAction<string>>
}> = ({ tabs, selectedTab, setSelectedTab }) => {
  return (
    <div className="overflow-x-auto">
      <Root
        type="single"
        defaultValue="0"
        value={selectedTab}
        onValueChange={(value) => {
          if (value) setSelectedTab(value)
        }}
        aria-label="Select content source"
        className="inline-block"
      >
        {tabs.map(({ label, disabled }, index) => (
          <Item
            key={index}
            value={index.toString()}
            disabled={disabled}
            aria-label={label}
            className={`relative overflow-hidden font-semibold focus:outline-none focus:ring-2 focus:ring-violet-300 dark:focus:ring-violet-900 border focus:z-20 ${
              index == 0 ? 'rounded-l-md' : index == tabs.length - 1 ? 'rounded-r-md' : '-mx-px'
            } ${
              index == parseInt(selectedTab)
                ? 'border-violet-300 dark:border-violet-900 z-20'
                : 'border-gray-200 dark:border-gray-800'
            }`}
          >
            {disabled ? (
              <div className="py-2 px-4 font-semibold bg-gray-50 text-gray-400 focus:outline-none dark:bg-gray-900 dark:text-gray-500">
                {label}
              </div>
            ) : (
              <div
                className={`py-2 px-4 ${
                  index == parseInt(selectedTab)
                    ? 'bg-violet-100 text-violet-600 hover:bg-violet-200 dark:text-violet-500 dark:bg-violet-600/20 dark:hover:bg-violet-600/30'
                    : 'text-gray-600 bg-gray-50 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
              >
                {label}
              </div>
            )}
          </Item>
        ))}
      </Root>
    </div>
  )
}
