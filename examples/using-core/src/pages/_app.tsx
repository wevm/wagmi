import * as React from 'react'
import type { AppProps } from 'next/app'
import NextHead from 'next/head'

import { wagmiClient } from '../wagmi'

const App = ({ Component, pageProps }: AppProps) => {
  React.useEffect(() => {
    const autoConnect = async () => {
      await wagmiClient.autoConnect()
    }
    autoConnect()

    return () => {
      wagmiClient.destroy()
    }
  }, [])

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
