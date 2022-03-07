import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { providers } from 'ethers'

// Imports
import {
  Connector,
  Provider,
  chain,
  createWagmiClient,
  defaultChains,
} from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'

import { App } from './App'

// Get environment variables
const alchemyId = import.meta.env.VITE_ALCHEMY_ID as string
// const etherscanApiKey = import.meta.env.VITE_ETHERSCAN_API_KEY as string
const infuraId = import.meta.env.VITE_INFURA_ID as string

// Pick chains
const chains = defaultChains
const defaultChain = chain.mainnet

// Set up connectors
type ConnectorsConfig = { chainId?: number }
const connectors = ({ chainId }: ConnectorsConfig) => {
  const rpcUrl =
    chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
    defaultChain.rpcUrls[0]
  return [
    new InjectedConnector({ chains, options: { shimDisconnect: true } }),
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
}

// Set up providers
type ProviderConfig = { chainId?: number; connector?: Connector }
const isChainSupported = (chainId?: number) =>
  chains.some((x) => x.id === chainId)

// Set up providers
const provider = ({ chainId }: ProviderConfig) =>
  new providers.AlchemyProvider(
    isChainSupported(chainId) ? chainId : defaultChain.id,
    alchemyId,
  )
const webSocketProvider = ({ chainId }: ConnectorsConfig) =>
  isChainSupported(chainId)
    ? new providers.InfuraWebSocketProvider(chainId, infuraId)
    : undefined

const client = createWagmiClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})

ReactDOM.render(
  <React.StrictMode>
    <Provider client={client}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)
