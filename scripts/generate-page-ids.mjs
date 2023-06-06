import crypto from 'crypto'
import glob from 'glob'
import fs from 'fs'
import matter from 'gray-matter'

const pages = glob.sync('./content/docs/**/*.md*', { ignore: './content/docs/index.md*' })

function generateId() {
  const id = crypto.randomBytes(4).toString('hex')
  if (id.match(/^\d/)) return generateId()
  return id
}

const skipped = []

pages.forEach((pagePath) => {
  const id = generateId()
  const rawContent = fs.readFileSync(pagePath, 'utf8')
  const { data } = matter(rawContent)
  if (data.global_id) {
    skipped.push(pagePath)
    return
  }
  if (!rawContent.startsWith('---\n')) {
    throw new Error(`[Error] ${pagePath} does not have frontmatter`)
  }

  const newContent = rawContent.replace(/^---\n/, `---\nglobal_id: ${id}\n`)
  fs.writeFileSync(pagePath, newContent)
  console.log(`[New ID] ${pagePath} -> ${id}`)
})

if (skipped.length) {
  console.log(`[Skipped] ${skipped.length} with existing ids`)
}
