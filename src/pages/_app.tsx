import type { AppProps } from 'next/app'
import React from 'react'
import { ColorSchemeProvider } from '../components/ColorSchemeContext'
import { SearchProvider } from '../components/SearchContext'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ColorSchemeProvider>
      <SearchProvider>
        <Component {...pageProps} />
      </SearchProvider>
    </ColorSchemeProvider>
  )
}
export default MyApp
