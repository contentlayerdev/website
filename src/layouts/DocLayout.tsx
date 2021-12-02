import Link from 'next/link'
import { useRouter } from 'next/router'
import type { FC } from 'react'

import { Layout } from '../components/Layout'
import type * as types from '.contentlayer/types'
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
        <aside className="w-64 p-4 border-r">
          <nav className="text-sm">
            <Tree tree={tree} level={0} />
            {/* {allDocs.map((doc, idx) => {
              return (
                <span key={idx} className="block mb-2">
                  <Link href={`/${doc.url_path}`}>
                    <a className={navLinkClassName(doc)}>{doc.title}</a>
                  </Link>
                </span>
              )
            })} */}
          </nav>
        </aside>
        <div className="flex-1 p-4">
          <h1>{doc.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: doc.body.html }} />
        </div>
      </div>
    </Layout>
  )
}

const Tree: FC<{ tree: TreeRoot; level: number }> = ({ tree, level }) => (
  <div style={{ paddingLeft: level * 8 }} className="mb-2">
    {tree.map((treeNode) => (
      <div key={treeNode.urlPath}>
        <Link href={treeNode.urlPath}>
          <a>{treeNode.title}</a>
        </Link>
        {treeNode.children.length > 0 && <Tree tree={treeNode.children} level={level + 1} />}
      </div>
    ))}
  </div>
)
