import { describe, expect, it } from 'vitest'

import { defaultChains } from '../constants'
import { WalletConnectConnectorV2 } from './walletConnectV2'

describe('WalletConnectConnectorV2', () => {
  it.only('inits', () => {
    const connector = new WalletConnectConnectorV2({
      chains: defaultChains,
      options: {
        relayUrl: 'wss://localhost:5555',
      },
    })
    expect(connector.name).toEqual('WalletConnectV2')
  })
})
