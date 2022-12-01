import { foundry } from '@wagmi/chains'
import { describe, expect, it } from 'vitest'

import { testChains } from '../../test'

import { WalletConnectConnector } from './walletConnect'

describe('WalletConnectConnector', () => {
  it('inits', () => {
    const connector = new WalletConnectConnector({
      chains: testChains,
      options: {
        rpc: {
          [foundry.id]: foundry.rpcUrls.default.http[0]!,
        },
      },
    })
    expect(connector.name).toEqual('WalletConnect')
  })
})
