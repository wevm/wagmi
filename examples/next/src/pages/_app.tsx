import * as React from 'react'
import type { AppProps } from 'next/app'
import NextHead from 'next/head'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <NextHead>
        <title>wagmi</title>
      </NextHead>

      <Component {...pageProps} />
    </>
  )
}

export default App
