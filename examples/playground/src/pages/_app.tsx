import * as React from 'react'
import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import {
  InfuraProvider,
  InfuraWebSocketProvider,
} from '@ethersproject/providers'
import { Provider, chain, createClient, defaultChains } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'

const infuraId = process.env.NEXT_PUBLIC_INFURA_ID as string

const chains = defaultChains
const defaultChain = chain.mainnet

const isChainSupported = (chainId?: number) =>
  chains.some((x) => x.id === chainId)

const client = createClient({
  autoConnect: true,
  connectors({ chainId }) {
    const rpcUrl =
      chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
      defaultChain.rpcUrls[0]
    return [
      new InjectedConnector({
        chains,
        options: {
          shimDisconnect: true,
        },
      }),
      new WalletConnectConnector({
        chains,
        options: {
          infuraId,
          qrcode: true,
        },
      }),
      new CoinbaseWalletConnector({
        chains,
        options: {
          appName: 'wagmi',
          jsonRpcUrl: `${rpcUrl}/${infuraId}`,
        },
      }),
    ]
  },
  provider({ chainId }) {
    return new InfuraProvider(
      isChainSupported(chainId) ? chainId : defaultChain.id,
    )
  },
  webSocketProvider({ chainId }) {
    return new InfuraWebSocketProvider(
      isChainSupported(chainId) ? chainId : defaultChain.id,
    )
  },
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
