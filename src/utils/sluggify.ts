import React from 'react'

export const sluggifyTitle = (title: string) => {
  const re = /[^\w\s]/g
  return title.toLowerCase().replace(re, '').replace(/\s+/g, '-')
}

export const getNodeText = (node: React.ReactNode): string => {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return node.toString()
  if (node instanceof Array) return node.map(getNodeText).join('')
  if (typeof node === 'object' && node) return getNodeText((node as any).props.children)

  console.log(node)
  throw new Error(`Should be never reached`)
}
