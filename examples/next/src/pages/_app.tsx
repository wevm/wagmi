import * as React from 'react'
import type { AppProps } from 'next/app'
import { providers } from 'ethers'
import NextHead from 'next/head'
import {
  InjectedConnector,
  Provider,
  WalletConnectConnector,
  WalletLinkConnector,
  chain,
  defaultChains,
  defaultL2Chains,
  developmentChains,
} from 'wagmi'

const infuraId = process.env.NEXT_PUBLIC_INFURA_ID

const chains = [...defaultChains, ...defaultL2Chains, ...developmentChains]

type Config = { chainId?: number }
const connectors = ({ chainId }: Config) => {
  const rpcUrl =
    chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
    chain.mainnet.rpcUrls[0]
  return [
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        infuraId,
        qrcode: true,
      },
    }),
    new WalletLinkConnector({
      chains,
      options: {
        appName: 'wagmi',
        jsonRpcUrl: `${rpcUrl}/${infuraId}`,
      },
    }),
  ]
}
const provider = ({ chainId }: Config) =>
  new providers.InfuraProvider(chainId, infuraId)
const webSocketProvider = ({ chainId }: Config) =>
  new providers.InfuraWebSocketProvider(chainId, infuraId)

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider
      autoConnect
      connectorStorageKey="wagmiWallet"
      connectors={connectors}
      provider={provider}
      webSocketProvider={webSocketProvider}
    >
      <NextHead>
        <title>wagmi</title>
      </NextHead>

      <Component {...pageProps} />
    </Provider>
  )
}

export default App
