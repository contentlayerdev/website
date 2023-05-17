import crypto from 'crypto'
import glob from 'glob'
import fs from 'fs'

const pages = glob.sync('./content/docs/**/*.md*')

pages.forEach((pagePath) => {
  const id = crypto.randomBytes(4).toString('hex')
  const content = fs.readFileSync(pagePath, 'utf8')
  if (content.match(/^---\nid: /)) {
    console.log(`[Notice] ${pagePath} already has an id`)
  }
  if (!content.startsWith('---\n')) {
    throw new Error(`[Error] ${pagePath} does not have frontmatter`)
  }

  const newContent = content.replace(/^---\n/, `---\nid: ${id}\n`)
  fs.writeFileSync(pagePath, newContent)
})
