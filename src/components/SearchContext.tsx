import { FC, ReactNode } from 'react'
import { KBarProvider, KBarPortal, KBarPositioner, KBarSearch, KBarAnimator, KBarResults, useMatches } from 'kbar'
import { TreeNode } from 'types/TreeNode'

const actions = [
  {
    id: 'blog',
    name: 'Blog',
    shortcut: ['b'],
    keywords: 'writing words',
    perform: () => (window.location.pathname = 'blog'),
  },
  {
    id: 'contact',
    name: 'Contact',
    shortcut: ['c'],
    keywords: 'email',
    perform: () => (window.location.pathname = 'contact'),
  },
]

export const SearchProvider: FC<{ tree: TreeNode[]; children: ReactNode }> = ({ tree, children }) => {
  return (
    <KBarProvider actions={actions}>
      <KBarPortal>
        <KBarPositioner className="bg-gray-300/50 backdrop-blur backdrop-filter dark:bg-gray-950/60">
          <KBarAnimator>
            <KBarSearch className="h-12" />
            <RenderResults />
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
    </KBarProvider>
  )
}

const RenderResults = () => {
  const { results } = useMatches()
  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) => <div>{typeof item === 'string' ? item : item.name}</div>}
    />
  )
}
