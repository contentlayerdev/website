import { FC, ReactNode, useMemo } from 'react'
import { useRouter } from 'next/router'
import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarSearch,
  KBarAnimator,
  KBarResults,
  useMatches,
  Action,
} from 'kbar'
import { TreeNode } from 'types/TreeNode'
import { Card } from './common/Card'
import { Icon } from './common/Icon'
import { Label } from './common/Label'

export const SearchProvider: FC<{ tree: TreeNode[]; children: ReactNode }> = ({ tree, children }) => {
  const router = useRouter()

  const actions = useMemo(() => {
    let actions: Action[] = []
    let id = 0
    const mapDocs = (tree: TreeNode[], section?: string) => {
      for (const element of tree) {
        actions.push({
          id: id.toString(),
          name: element.label ? `${element.title} (${element.label})` : element.title,
          keywords: element?.excerpt || '',
          section: section || element.title,
          perform: () => router.push(element.urlPath),
        })
        id++
        if (element.children.length) mapDocs(element.children, section || element.title)
      }
    }
    mapDocs(tree)
    return actions
  }, [tree])

  return (
    <KBarProvider actions={actions}>
      <KBarPortal>
        <KBarPositioner className="bg-gray-300/50 p-4 backdrop-blur backdrop-filter dark:bg-black/50">
          <KBarAnimator className="w-full max-w-xl">
            <Card>
              <div className="flex items-center space-x-4 p-4 ">
                <span className="block w-5">
                  <Icon name="search" />
                </span>
                <KBarSearch className="h-8 w-full bg-transparent text-slate-600 placeholder-slate-400 focus:outline-none dark:text-slate-200 dark:placeholder-slate-500" />
                <Label text="ESC" />
              </div>
              <RenderResults />
            </Card>
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
    </KBarProvider>
  )
}

const RenderResults = () => {
  const { results } = useMatches()

  if (results.length) {
    return (
      <KBarResults
        items={results}
        onRender={({ item, active }) => (
          <div>
            {typeof item === 'string' ? (
              <div className="block border-t border-gray-100 px-4 pt-4 pb-2 text-xs font-semibold uppercase text-slate-400 dark:border-gray-800 dark:text-slate-500">
                {item}
              </div>
            ) : (
              <div
                className={`block cursor-pointer px-4 py-2 text-slate-600 dark:text-slate-300 ${
                  active ? 'bg-gray-100 dark:bg-gray-800' : 'bg-transparent'
                }`}
              >
                {item.name}
              </div>
            )}
          </div>
        )}
      />
    )
  } else {
    return (
      <div className="block border-t border-gray-100 px-4 py-8 text-center text-slate-400 dark:border-gray-800 dark:text-slate-600">
        No results for your search...
      </div>
    )
  }
}
