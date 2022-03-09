import type { AppProps } from 'next/app'
// import Head from "next/head";
import React from 'react'
import { ColorSchemeProvider } from '../ColorSchemeContext'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <Head></Head> */}
      <ColorSchemeProvider>
        <Component {...pageProps} />
      </ColorSchemeProvider>
    </>
  )
}
export default MyApp
