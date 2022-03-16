import { FC, useState } from 'react'
import * as Tooltip from '@radix-ui/react-tooltip'

const Folder: FC<{ name: string; level: number; lastItem?: boolean; parentLastItem?: boolean; childNodes: any[] }> = ({
  name,
  level,
  lastItem = false,
  parentLastItem = false,
  childNodes,
}) => {
  return (
    <div className="font-mono text-slate-500 dark:text-slate-400 text-xs">
      <div className="whitespace-pre">
        {!parentLastItem && level >= 2 && [...new Array(level - 2)].map((v, i) => <span key={i}>{'│   '}</span>)}
        {level > 1 && <span>{lastItem ? '└── ' : '├── '}</span>}
        <span>{name}</span>
      </div>
      <ul className="list-none m-0">
        {childNodes.map((child, index) => (
          <li key={index} className="m-0">
            {child.type == 'folder' && (
              <Folder
                name={child.name}
                level={level + 1}
                lastItem={index == childNodes.length - 1}
                parentLastItem={lastItem}
                childNodes={child.children}
              />
            )}
            {child.type == 'file' && (
              <File
                name={child.name}
                level={level + 1}
                lastItem={index == childNodes.length - 1}
                parentLastItem={lastItem}
                comment={child.comment}
                tooltip={child.tooltip}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

const File: FC<{
  name: string
  level: number
  lastItem?: boolean
  parentLastItem?: boolean
  comment: string
  tooltip: string
}> = ({ name, level, lastItem = false, parentLastItem = false, comment, tooltip }) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false)

  return (
    <Tooltip.Root delayDuration={100} open={showTooltip} onOpenChange={(open) => setShowTooltip(open)}>
      <div className="whitespace-pre">
        {level >= 2 &&
          [...new Array(level - 2)].map((v, i) => (
            <span key={i}>{parentLastItem && i == level - 3 ? '    ' : '│   '}</span>
          ))}
        {lastItem ? <span>└── </span> : <span>├── </span>}
        <Tooltip.Trigger className="cursor-text">
          <span
            onClick={() => setShowTooltip(true)}
            className="rounded hover:bg-gray-200 dark:hover:bg-gray-800 hover:ring-4 hover:ring-gray-200 dark:hover:ring-gray-800"
          >
            {name}
          </span>
        </Tooltip.Trigger>
        {comment && <span className="opacity-50">{` # ${comment}`}</span>}
      </div>

      <Tooltip.Content
        sideOffset={2}
        className="bg-gray-800 rounded text-slate-100 text-sm px-3 py-1.5 shadow-xl shadow-white dark:bg-violet-200 dark:text-violet-900 dark:shadow-black"
      >
        {tooltip}
        <Tooltip.Arrow className="mx-1 fill-current text-gray-800 dark:text-violet-200" />
      </Tooltip.Content>
    </Tooltip.Root>
  )
}

export const FileTree: FC<{ contents: any }> = ({ contents }) => {
  return (
    <div className="grow">
      <div className="bg-gray-50 border border-gray-100 shadow-lg shadow-gray-100 rounded-2xl overflow-hidden p-4 dark:bg-gray-900/50 dark:border-gray-900 dark:shadow-gray-900">
        {contents.type == 'folder' && (
          <Folder name={contents.name} level={1} lastItem={true} childNodes={contents.children} />
        )}
      </div>
    </div>
  )
}
