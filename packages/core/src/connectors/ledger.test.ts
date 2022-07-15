import { describe, expect, it } from 'vitest'

import { chain, defaultChains } from '../constants'
import { LedgerConnector } from './ledger'

describe('LedgerConnector', () => {
  it('inits', () => {
    const connector = new LedgerConnector({
      chains: defaultChains,
      options: {
        rpc: {
          [chain.foundry.id]: chain.foundry.rpcUrls.default,
        },
      },
    })
    expect(connector.name).toEqual('Ledger')
  })
})
