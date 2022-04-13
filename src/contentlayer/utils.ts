import type { DocumentGen } from 'contentlayer/core'
import * as fs from 'node:fs/promises'
import path from 'node:path'

export const contentDirPath = 'content'

export const urlFromFilePath = (doc: DocumentGen): string => {
  return doc._raw.flattenedPath.replace(/pages\/?/, '')
}

export const getLastEditedDate = async (doc: DocumentGen): Promise<Date> => {
  const stats = await fs.stat(path.join(contentDirPath, doc._raw.sourceFilePath))
  return stats.mtime
}
