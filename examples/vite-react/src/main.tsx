import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { providers } from 'ethers'

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

import { App } from './App'

const infuraId = import.meta.env.VITE_INFURA_ID as string

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

ReactDOM.render(
  <React.StrictMode>
    <Provider
      autoConnect
      connectorStorageKey="wagmi.wallet"
      connectors={connectors}
      provider={provider}
      webSocketProvider={webSocketProvider}
    >
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)
