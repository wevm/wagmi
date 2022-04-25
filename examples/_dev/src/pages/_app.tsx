import * as React from 'react'
import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import { Provider, chain, createClient, defaultChains } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { providers } from 'ethers/lib/ethers'

const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID as string

const chains = [...defaultChains, chain.optimism]
const defaultChain = chain.mainnet

const isChainSupported = (chainId?: number) =>
  chains.some((x) => x.id === chainId)

const client = createClient({
  autoConnect: true,
  connectors({ chainId }) {
    const chain = chains.find((x) => x.id === chainId) ?? defaultChain
    const rpcUrl = chain.rpcUrls.alchemy
      ? `${chain.rpcUrls.alchemy}/${alchemyId}`
      : chain.rpcUrls.default
    return [
      new InjectedConnector({ chains }),
      new CoinbaseWalletConnector({
        chains,
        options: {
          appName: 'wagmi',
          jsonRpcUrl: rpcUrl,
        },
      }),
      new WalletConnectConnector({
        chains,
        options: {
          qrcode: true,
          rpc: {
            [chain.id]: rpcUrl,
          },
        },
      }),
    ]
  },
  provider({ chainId }) {
    return new providers.AlchemyProvider(
      isChainSupported(chainId) ? chainId : defaultChain.id,
    )
  },
  webSocketProvider({ chainId }) {
    return new providers.AlchemyWebSocketProvider(
      isChainSupported(chainId) ? chainId : defaultChain.id,
      alchemyId,
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
