import { FC, Fragment } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { TreeNode } from 'types/TreeNode'
import React from 'react'
import { Label } from '../components/Label'

const NavLink: FC<{ title: string; label?: string; url: string; level: number; activePath: string }> = ({
  title,
  label,
  url,
  level,
  activePath,
}) => {
  return (
    <Link href={url}>
      <a
        className={classNames(
          'group flex h-8 items-center space-x-2 rounded-md px-3 text-sm leading-none hover:bg-gray-50 dark:hover:bg-gray-900',
          url == activePath
            ? `${
                level == 0 ? 'font-medium' : 'font-normal'
              } bg-violet-50 text-violet-600 hover:bg-violet-100 hover:text-violet-700 dark:bg-violet-500/20 dark:text-violet-300 dark:hover:bg-violet-500/25 dark:hover:text-violet-400`
            : level == 0
            ? 'font-medium text-slate-600 hover:text-slate-700 dark:text-slate-300 dark:hover:text-slate-200'
            : 'font-normal hover:text-slate-600 dark:hover:text-slate-300',
        )}
      >
        <span>{title}</span>
        {label && <Label text={label} />}
      </a>
    </Link>
  )
}

const Tree: FC<{ tree: TreeNode[]; level: number; activePath: string }> = ({ tree, level, activePath }) => {
  return (
    <div
      className={classNames('ml-3 space-y-2 pl-3', level > 0 ? 'border-l border-gray-200 dark:border-gray-800' : '')}
    >
      {tree.map((treeNode, index) => (
        <Fragment key={`${level}-${index}`}>
          <NavLink
            title={treeNode.nav_title || treeNode.title}
            label={treeNode.label || undefined}
            url={treeNode.urlPath}
            level={level}
            activePath={activePath}
          />
          {treeNode.children.length > 0 && <Tree tree={treeNode.children} level={level + 1} activePath={activePath} />}
        </Fragment>
      ))}
    </div>
  )
}

export const DocsNavigation: FC<{ tree: TreeNode[] }> = ({ tree }) => {
  const router = useRouter()

  return (
    <aside className="-ml-6 max-w-sm">
      <div>
        <Tree tree={tree} level={0} activePath={router.asPath} />
      </div>
    </aside>
  )
}
