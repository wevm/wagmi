import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { getDefaultProvider, providers } from 'ethers'

import {
  InjectedConnector,
  Provider,
  WalletConnectConnector,
  WalletLinkConnector,
  defaultChains,
  defaultL2Chains,
  developmentChains,
} from '../src'
import { App } from './app'

const infuraId = import.meta.env.VITE_INFURA_ID
const chains = [...defaultChains, ...defaultL2Chains, ...developmentChains]
const connectors = [
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
      jsonRpcUrl: `https://rinkeby.infura.io/v3/${infuraId}`,
    },
  }),
]

ReactDOM.render(
  <React.StrictMode>
    <Provider
      autoConnect
      connectorStorageKey="wagmiWallet"
      connectors={connectors}
      provider={({ connector, chainId }) =>
        connector
          ? new providers.InfuraProvider(chainId, infuraId)
          : getDefaultProvider(chainId, {
              infuraId,
            })
      }
      webSocketProvider={({ chainId }) =>
        new providers.InfuraWebSocketProvider(chainId, infuraId)
      }
    >
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)
