import Link from 'next/link'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import type * as types from '.contentlayer/types'
import classnames from 'classnames'

import { Layout } from '../components/Layout'
import { TreeRoot } from '../pages/docs/[[...slug]]'

export const DocLayout: FC<{ doc: types.Doc; tree: TreeRoot }> = ({ doc, tree }) => {
  const router = useRouter()
  const SIDEBAR_WIDTH = 320
  const HEADER_HEIGHT = 60

  return (
    <Layout doc={doc}>
      <div className="flex">
        <aside
          className="fixed"
          style={{ height: `calc(100vh - ${HEADER_HEIGHT}px)`, width: SIDEBAR_WIDTH, top: HEADER_HEIGHT }}
        >
          <div className="h-full p-4 overflow-y-auto border-r">
            <Tree tree={tree} level={0} activeUrlPath={router.asPath} />
          </div>
        </aside>
        <div className="flex-1 max-w-2xl px-12 py-8 markdown" style={{ marginLeft: SIDEBAR_WIDTH }}>
          <h1>{doc.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: doc.body.html }} />
        </div>
      </div>
    </Layout>
  )
}

const Tree: FC<{ tree: TreeRoot; level: number; activeUrlPath: string }> = ({ tree, level, activeUrlPath }) => (
  <div style={{ paddingLeft: level * 12 }} className="mb-2 space-y-1">
    {tree.map((treeNode) => (
      <div key={treeNode.urlPath}>
        <Link href={treeNode.urlPath}>
          <a
            className={classnames('p-2 no-underline text-sm block rounded-md text-gray-800 hover:bg-gray-50', {
              'bg-gray-100 font-bold': activeUrlPath === treeNode.urlPath,
            })}
          >
            {treeNode.title}
          </a>
        </Link>
        {treeNode.children.length > 0 && (
          <Tree tree={treeNode.children} level={level + 1} activeUrlPath={activeUrlPath} />
        )}
      </div>
    ))}
  </div>
)
