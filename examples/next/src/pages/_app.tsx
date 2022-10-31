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
import { WalletConnectConnectorV2 } from 'wagmi/connectors/walletConnectV2'
import { alchemyProvider } from 'wagmi/providers/alchemy'

const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  alchemyProvider({ apiKey: '_Y1djHlMomg9Hw5sTiZU3CZhKpLbPX-h' }),
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
    new WalletConnectConnectorV2({
      chains,
      options: {},
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
