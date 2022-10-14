import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import * as React from 'react'

import {
  WagmiConfig,
  configureChains,
  createClient,
  defaultChains,
} from 'wagmi'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY }),
  publicProvider(),
])

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
})

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  return (
    <WagmiConfig client={client}>
      <NextHead>
        <title>wagmi</title>
      </NextHead>

      {mounted && <Component {...pageProps} />}
    </WagmiConfig>
  )
}

export default App
