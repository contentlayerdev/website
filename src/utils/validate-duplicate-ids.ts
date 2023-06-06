import { Doc } from 'contentlayer/generated'

export async function validateDuplicateIds(allDocs: Doc[]) {
  const ids = allDocs.map((doc) => doc.global_id)

  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index)
  if (duplicates.length) {
    throw new Error(`[Error] Duplicate ids found: ${duplicates.join(', ')}`)
  }

  console.log('No duplicate ids found')
}
