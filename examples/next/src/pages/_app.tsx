import * as React from 'react'
import type { AppProps } from 'next/app'
import { providers } from 'ethers'
import NextHead from 'next/head'

import { Provider, chain, createClient, defaultChains } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'

const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID as string
const etherscanApiKey = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY as string
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
      new InjectedConnector({ chains }),
      new CoinbaseWalletConnector({
        chains,
        options: {
          appName: 'wagmi',
          jsonRpcUrl: `${rpcUrl}/${infuraId}`,
        },
      }),
      new WalletConnectConnector({
        chains,
        options: {
          infuraId,
          qrcode: true,
        },
      }),
    ]
  },
  provider({ chainId }) {
    return providers.getDefaultProvider(
      isChainSupported(chainId) ? chainId : defaultChain.id,
      {
        alchemy: alchemyId,
        etherscan: etherscanApiKey,
        infura: infuraId,
      },
    )
  },
  webSocketProvider({ chainId }) {
    return new providers.InfuraWebSocketProvider(
      isChainSupported(chainId) ? chainId : defaultChain.id,
    )
  },
})

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider client={client}>
      <NextHead>
        <title>wagmi</title>
      </NextHead>

      <Component {...pageProps} />
    </Provider>
  )
}

export default App
