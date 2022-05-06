import * as React from 'react'
import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import {
  Provider,
  chain,
  configureChains,
  createClient,
  defaultChains,
} from 'wagmi'

import { alchemyProvider } from 'wagmi/apiProviders/alchemy'

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID

const { chains, provider, webSocketProvider } = configureChains(
  [...defaultChains, chain.optimism],
  [alchemyProvider({ alchemyId })],
)

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
        name: (detectedName) =>
          `Injected (${
            typeof detectedName === 'string'
              ? detectedName
              : detectedName.join(', ')
          })`,
      },
    }),
  ],
  provider,
  webSocketProvider,
})

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <NextHead>
        <title>wagmi</title>
      </NextHead>

      <Provider client={client}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default App
