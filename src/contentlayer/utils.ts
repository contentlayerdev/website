import type { DocumentGen } from 'contentlayer/core'
import * as fs from 'node:fs/promises'
import path from 'node:path'

export const contentDirPath = 'content'

export const urlFromFilePath = (doc: DocumentGen): string => {
  let urlPath = doc._raw.flattenedPath.replace(/^pages\/?/, '/')
  if (!urlPath.startsWith('/')) urlPath = `/${urlPath}`
  if ('global_id' in doc) urlPath += `-${doc.global_id}`
  // Remove preceding indexes from path segments
  urlPath = urlPath
    .split('/')
    .map((segment) => segment.replace(/^\d\d\d\-/, ''))
    .join('/')
  return urlPath
}

export const getLastEditedDate = async (doc: DocumentGen): Promise<Date> => {
  const stats = await fs.stat(path.join(contentDirPath, doc._raw.sourceFilePath))
  return stats.mtime
}
