import { children } from 'cheerio/lib/api/traversing'
import { Example } from 'contentlayer/generated'
import { TreeNode } from 'types/TreeNode'

export const buildExamplesTree = (examples: Example[], parentPathNames: string[] = []): TreeNode[] => {
  const level = parentPathNames.length

  return examples
    .filter(
      (_) =>
        _.pathSegments.length === level + 1 &&
        _.pathSegments
          .map((_: PathSegment) => _.pathName)
          .join('/')
          .startsWith(parentPathNames.join('/')),
    )
    .sort((a, b) => a.pathSegments[level].order - b.pathSegments[level].order)
    .map<TreeNode>((example) => ({
      nav_title: example.nav_title ?? null,
      title: example.title,
      label: example.label ?? null,
      excerpt: example.excerpt ?? null,
      collapsible: false,
      collapsed: false,
      urlPath: '/' + example.pathSegments.map((_: PathSegment) => _.pathName).join('/'),
      children: buildExamplesTree(
        examples,
        example.pathSegments.map((_: PathSegment) => _.pathName),
      ),
    }))
}
