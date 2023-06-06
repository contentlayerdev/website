import React, { FC, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { TreeNode } from 'types/TreeNode'
import { Label } from '../common/Label'
import { Icon } from '../common/Icon'

const NavLink: FC<{
  title: string
  label?: string
  url: string
  level: number
  activePath: string
  collapsible: boolean
  collapsed: boolean
  toggleCollapsed: () => void
}> = ({ title, label, url, level, activePath, collapsible, collapsed, toggleCollapsed }) => {
  return (
    <div
      className={classNames(
        'group flex h-8 items-center justify-between space-x-2 whitespace-nowrap rounded-md px-3 text-sm leading-none',
        url == activePath
          ? `${
              level == 0 ? 'font-medium' : 'font-normal'
            } bg-violet-50 text-violet-900 dark:bg-violet-500/20 dark:text-violet-50`
          : `hover:bg-gray-50 dark:hover:bg-gray-900 ${
              level == 0
                ? 'font-medium text-slate-600 hover:text-slate-700 dark:text-slate-300 dark:hover:text-slate-200'
                : 'font-normal hover:text-slate-600 dark:hover:text-slate-300'
            }`,
      )}
    >
      <Link href={url}>
        <a className="flex items-center h-full space-x-2 grow">
          <span>{title}</span>
          {label && <Label text={label} />}
        </a>
      </Link>
      {collapsible && (
        <button aria-label="Toggle children" onClick={toggleCollapsed} className="px-2 py-1 mr-2 shrink-0">
          <span className={`block w-2.5 ${collapsed ? '-rotate-90 transform' : ''}`}>
            <Icon name="chevron-down" />
          </span>
        </button>
      )}
    </div>
  )
}

const Node: FC<{ node: TreeNode; level: number; activePath: string }> = ({ node, level, activePath }) => {
  const [collapsed, setCollapsed] = useState<boolean>(node.collapsed ?? false)
  const toggleCollapsed = () => setCollapsed(!collapsed)

  useEffect(() => {
    if (activePath == node.urlPath || node.children.map((_) => _.urlPath).includes(activePath)) {
      setCollapsed(false)
    }
  }, [activePath, node.children, node.urlPath])

  return (
    <>
      <NavLink
        title={node.nav_title || node.title}
        label={node.label || undefined}
        url={node.urlPath}
        level={level}
        activePath={activePath}
        collapsible={node.collapsible ?? false}
        collapsed={collapsed}
        toggleCollapsed={toggleCollapsed}
      />
      {node.children.length > 0 && !collapsed && (
        <Tree tree={node.children} level={level + 1} activePath={activePath} />
      )}
    </>
  )
}

const Tree: FC<{ tree: TreeNode[]; level: number; activePath: string }> = ({ tree, level, activePath }) => {
  return (
    <div
      className={classNames('ml-3 space-y-2 pl-3', level > 0 ? 'border-l border-gray-200 dark:border-gray-800' : '')}
    >
      {tree.map((treeNode, index) => (
        <Node key={index} node={treeNode} level={level} activePath={activePath} />
      ))}
    </div>
  )
}

export const DocsNavigation: FC<{ tree: TreeNode[] }> = ({ tree }) => {
  const router = useRouter()

  return (
    <aside className="-ml-6 w-80">
      <div>
        <Tree tree={tree} level={0} activePath={router.asPath} />
      </div>
    </aside>
  )
}
