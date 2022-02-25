import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import type * as types from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import classnames from 'classnames'
import { Helmet } from 'react-helmet'

// TODO: Fix the styling here. We should have sensible defaults in place, but
// should be able to override those with Tailwind classes in this layout, rather
// than needed a CSS module.
//
// After putting those defaults in place, clean up any necessary styling on the
// home page.
//
// We should be left without any page-specific CSS files as much as possible.
import styles from './styles.module.css'

import { Header } from '../../components/Header'
import { TreeRoot, TreeNode } from '../../pages/docs/[[...slug]]'
import React from 'react'

import { Callout } from '../../components/Callout'
import { Card } from '../../components/Card'
import { Label } from '../../components/Label'

const mdxComponents = {
  Callout,
  Card,
  Image,
  Link,
}

export const DocLayout: FC<{ doc: types.Doc; tree: TreeRoot; childrenTree: TreeNode[] }> = ({
  doc,
  tree,
  childrenTree,
}) => {
  const router = useRouter()
  const SIDEBAR_WIDTH = 320
  const HEADER_HEIGHT = 60

  const MDXContent = doc?.body?.code ? useMDXComponent(doc.body.code) : null

  return (
    <div>
      <Helmet>
        <title>{doc.title}</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🆑</text></svg>"
        />
      </Helmet>

      <Header />

      <div className="font-cl h-full pt-[57px] bg-white dark:bg-gray-950 text-gray-950 dark:text-white flex">
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
        <div
          className={classnames(styles.docBody, 'flex-1 max-w-3xl px-12 py-8 markdown')}
          style={{ marginLeft: SIDEBAR_WIDTH }}
        >
          <h1>
            {doc.title}{' '}
            {doc.label && (
              <span className="inline-block ml-2">
                <Label text={doc.label} />
              </span>
            )}
          </h1>
          {MDXContent && <MDXContent components={mdxComponents} />}
          {doc.show_child_cards && <ChildCards tree={childrenTree} />}
        </div>
      </div>
    </div>
  )
}

const Tree: FC<{ tree: TreeRoot; level: number; activeUrlPath: string }> = ({ tree, level, activeUrlPath }) => (
  <div style={{ paddingLeft: level * 12 }} className="mb-2 space-y-1">
    {tree.map((treeNode, index) => (
      <React.Fragment key={`${treeNode.urlPath}-${index}`}>
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

const ChildTreeItem: FC<{ item: TreeNode }> = ({ item }) => {
  return (
    <Card
      title={item.title}
      label={item.label}
      subtitle={item.excerpt}
      link={{ label: 'View Page', url: item.urlPath }}
    />
  )
}

const ChildCards: FC<{ tree: TreeNode[] }> = ({ tree }) => {
  return (
    <div className="grid md:grid-cols-2 gap-4 mt-12">
      {tree.map((item, idx) => (
        <ChildTreeItem key={idx} {...{ item }} />
      ))}
    </div>
  )
}
