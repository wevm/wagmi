import { ConnectKitProvider, getDefaultClient } from 'connectkit';
import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import * as React from 'react'
import { WagmiConfig, createClient } from 'wagmi'

const client = createClient(
  getDefaultClient({
    autoConnect: true,
    appName: "My wagmi + ConnectKit App",
    alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  }),
);

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <NextHead>
          <title>My wagmi + ConnectKit App</title>
        </NextHead>

        {mounted && <Component {...pageProps} />}
      </ConnectKitProvider>
    </WagmiConfig>
  )
}

export default App
