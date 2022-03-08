import { load as cheerio } from 'cheerio'

// NOTE this is used to speed up reload in local dev
let cachedUsedByCount: number | undefined

export const getUsedByCount = async () => {
  if (cachedUsedByCount) {
    return cachedUsedByCount
  }

  const gitHubPage = await fetch('https://github.com/contentlayerdev/contentlayer/').then((_) => _.text())
  const $ = cheerio(gitHubPage)

  const usedByCountStr = $('#repo-content-pjax-container .Link--primary.no-underline')
    .filter((_, el) => $(el).text().includes('Used by'))
    .first()
    .find('.Counter')
    .text()

  const usedByCount = parseInt(usedByCountStr, 10)

  cachedUsedByCount = usedByCount

  return usedByCount
}
