import * as React from 'react'
import * as ReactDOM from 'react-dom/client'

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

import { App } from './App'

const alchemyId = import.meta.env.VITE_ALCHEMY_ID as string

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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <App />
    </WagmiConfig>
  </React.StrictMode>,
)
