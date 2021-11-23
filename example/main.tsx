import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { InjectedConnector, Provider, WalletConnectConnector } from '../src'
import { App } from './app'

import { Buffer } from 'buffer'
globalThis.Buffer = Buffer

const infuraId = import.meta.env.VITE_INFURA_ID

ReactDOM.render(
  <React.StrictMode>
    <Provider
      connectors={[
        new InjectedConnector(),
        new WalletConnectConnector({ infuraId, qrcode: true }),
      ]}
      eagerConnect
    >
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)
