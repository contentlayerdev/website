import Link from 'next/link'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import type * as types from '.contentlayer/types'
import { useMDXComponent } from 'next-contentlayer/hooks'
import classnames from 'classnames'

import { Layout } from '../components/Layout'
import { TreeRoot } from '../pages/docs/[[...slug]]'
import React from 'react'

import { Callout } from '../components/Callout'
import { Label } from '../components/Label'

const mdxComponents = {
  Callout,
}

export const DocLayout: FC<{ doc: types.Doc; tree: TreeRoot }> = ({ doc, tree }) => {
  const router = useRouter()
  const SIDEBAR_WIDTH = 320
  const HEADER_HEIGHT = 60

  const MDXContent = useMDXComponent(doc.body.code)

  return (
    <Layout doc={doc}>
      <div className="flex">
        <aside
          className="fixed"
          style={{
            height: `calc(100vh - ${HEADER_HEIGHT}px)`,
            width: SIDEBAR_WIDTH,
            top: HEADER_HEIGHT,
          }}
        >
          <div className="h-full p-4 overflow-y-auto border-r border-gray-100 dark:border-gray-800">
            <Tree tree={tree} level={0} activeUrlPath={router.asPath} />
          </div>
        </aside>
        <div className="flex-1 max-w-2xl px-12 py-8 markdown" style={{ marginLeft: SIDEBAR_WIDTH }}>
          <h1>{doc.title}</h1>
          <MDXContent components={mdxComponents} />
        </div>
      </div>
    </Layout>
  )
}

const Tree: FC<{ tree: TreeRoot; level: number; activeUrlPath: string }> = ({ tree, level, activeUrlPath }) => (
  <div style={{ paddingLeft: level * 12 }} className="mb-2 space-y-1">
    {tree.map((treeNode) => (
      <React.Fragment key={treeNode.urlPath}>
        <Link href={treeNode.urlPath}>
          <a
            className={classnames(
              'py-2 px-4 no-underline text-sm rounded-md hover:bg-gray-50 dark:hover:bg-gray-850 flex items-center space-x-2.5',
              activeUrlPath === treeNode.urlPath
                ? 'bg-gray-100 text-black dark:bg-gray-800 dark:text-white'
                : 'text-gray-500 dark:text-gray-400',
            )}
          >
            <span>{treeNode.nav_title || treeNode.title}</span>
            {treeNode.label && <Label text={treeNode.label} />}
          </a>
        </Link>
        {treeNode.children.length > 0 && (
          <Tree tree={treeNode.children} level={level + 1} activeUrlPath={activeUrlPath} />
        )}
      </React.Fragment>
    ))}
  </div>
)
