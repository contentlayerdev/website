import glob from 'glob'
import fs from 'fs'
import matter from 'gray-matter'

const pages = glob.sync('./content/docs/**/*.md*')

const ids = pages.map((pagePath) => {
  const rawContent = fs.readFileSync(pagePath, 'utf8')
  const { data } = matter(rawContent)
  if (!data.id) throw new Error(`[Error] ${pagePath} does not have an id`)
  return data.id
})

const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index)
if (duplicates.length) {
  throw new Error(`[Error] Duplicate ids found: ${duplicates.join(', ')}`)
}

console.log('No duplicate ids found')
