import { FC } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { SearchProvider } from '../SearchContext'
import { MainNavigation } from './MainNavigation'
import { Footer } from './Footer'

export const Container: FC<any> = ({ children, ...customMeta }) => {
  const router = useRouter()

  const meta = {
    title: 'Contentlayer',
    description: 'Validate and transform content into type-safe data.',
    url: 'https://contentlayer.dev',
    name: 'Contentlayer',
    image: 'https://contentlayer.dev/images/banner.jpg',
    type: 'website',
    ...customMeta,
  }
  const jsonLd = {
    '@context': 'http://www.schema.org',
    '@type': 'WebSite',
    name: meta.name,
    url: meta.url,
  }

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta property="og:url" content={`${meta.url}${router.asPath}`} />
        <link rel="canonical" href={`${meta.url}${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content={meta.name} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>
      <SearchProvider>
        <MainNavigation />
        <div className="flex min-h-screen flex-col justify-between">
          <main className="relative pt-16" style={{ scrollPaddingTop: '150px' }}>
            {children}
          </main>
          <Footer />
        </div>
      </SearchProvider>
    </>
  )
}
