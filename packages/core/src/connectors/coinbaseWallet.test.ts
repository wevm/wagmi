import { describe, expect, it } from 'vitest'

import { testChains } from '../../test'
import { foundry } from '../chains'

import { CoinbaseWalletConnector } from './coinbaseWallet'

describe('CoinbaseWalletConnector', () => {
  it('inits', () => {
    const connector = new CoinbaseWalletConnector({
      chains: testChains,
      options: {
        appName: 'wagmi',
        jsonRpcUrl: foundry.rpcUrls.default.http[0],
      },
    })
    expect(connector.name).toEqual('Coinbase Wallet')
  })
})
