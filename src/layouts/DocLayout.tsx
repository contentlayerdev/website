import Link from 'next/link'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import type * as types from '.contentlayer/types'
import classnames from 'classnames'

import { Layout } from '../components/Layout'
import { TreeRoot } from '../pages/docs/[[...docsSlug]]'

export const DocLayout: FC<{ doc: types.Doc; tree: TreeRoot }> = ({ doc, tree }) => {
  const router = useRouter()

  const navLinkClassName = (doc: types.Doc): string => {
    let classes = ['px-2', 'py-2', 'block', 'rounded-md', 'text-black', 'no-underline']
    if (router?.asPath === `/${doc.url_path}`) {
      classes.push('bg-gray-200 font-semibold')
    } else {
      classes.push('hover:bg-gray-100 text-gray-700')
    }
    return classes.join(' ')
  }

  return (
    <Layout doc={doc}>
      <div className="flex">
        <aside className="overflow-y-auto fixed w-80" style={{ height: 'calc(100vh - 57px)', top: 57 }}>
          <div className="p-4 h-full border-r">
            <Tree tree={tree} level={0} activeUrlPath={router.asPath} />
            {/* {allDocs.map((doc, idx) => {
              return (
                <span key={idx} className="block mb-2">
                  <Link href={`/${doc.url_path}`}>
                    <a className={navLinkClassName(doc)}>{doc.title}</a>
                  </Link>
                </span>
              )
            })} */}
          </div>
        </aside>
        <div className="flex-1 p-8 ml-80 max-w-2xl" style={{ marginTop: 57 }}>
          <h1>{doc.title}</h1>
          <div className="text-sm" dangerouslySetInnerHTML={{ __html: doc.body.html }} />
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
