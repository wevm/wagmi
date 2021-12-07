import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { getDefaultProvider, providers } from 'ethers'

import {
  InjectedConnector,
  Provider,
  WalletConnectConnector,
  defaultChains,
  defaultL2Chains,
  developmentChains,
} from '../src'
import { App } from './app'

const infuraId = import.meta.env.VITE_INFURA_ID

ReactDOM.render(
  <React.StrictMode>
    <Provider
      autoConnect
      connectorStorageKey="wagmiWallet"
      connectors={[
        new InjectedConnector({
          chains: [...defaultChains, ...defaultL2Chains, ...developmentChains],
        }),
        new WalletConnectConnector({ infuraId, qrcode: true }),
      ]}
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
