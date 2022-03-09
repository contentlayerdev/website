import { load as cheerio } from 'cheerio'

// NOTE this is used to speed up reload in local dev
let cachedUsedByCount: number | undefined

export const getUsedByCount = async () => {
  if (cachedUsedByCount) {
    return cachedUsedByCount
  }

  try {
    // We're scraping the GitHub website here instead of using the API since I don't want to deal with rate limits and API tokens 🤷‍♂️
    const gitHubPage = await fetch('https://github.com/contentlayerdev/contentlayer/').then((_) => _.text())
    const $ = cheerio(gitHubPage)

    const usedByCountStr = $('#repo-content-pjax-container .Link--primary.no-underline')
      .filter((_, el) => $(el).text().includes('Used by'))
      .first()
      .find('.Counter')
      .text()

    const usedByCount = parseInt(usedByCountStr, 10)

    if (Number.isNaN(usedByCount)) {
      throw new Error('Could not parse used by count')
    }

    cachedUsedByCount = usedByCount

    return usedByCount
  } catch (e) {
    console.log(`Error occurred while fetching used by count: ${e}`)

    // Hardcode last known number as fallback
    return 208
  }
}
