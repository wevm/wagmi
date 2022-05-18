import * as React from 'react'
import type { AppProps } from 'next/app'
import NextHead from 'next/head'

import {
  WagmiConfig,
  configureChains,
  createClient,
  defaultChains,
} from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID

const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  alchemyProvider({ alchemyId }),
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
    new InjectedConnector({ chains, options: { name: 'Injected' } }),
  ],
  provider,
  webSocketProvider,
})

function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <NextHead>
        <title>wagmi</title>
      </NextHead>

      <Component {...pageProps} />
    </WagmiConfig>
  )
}

export default App
