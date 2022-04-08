export type TreeNode = {
  title: string
  nav_title: string | null
  label: string | null
  excerpt: string | null
  urlPath: string
  children: TreeNode[]
  collapsible: boolean | null
  collapsed: boolean | null
}
