import { describe, expect, it } from 'vitest'

import { chain, defaultChains } from '../constants'
import { CoinbaseWalletConnector } from './coinbaseWallet'

describe('CoinbaseWalletConnector', () => {
  it('inits', () => {
    const connector = new CoinbaseWalletConnector({
      chains: defaultChains,
      options: {
        appName: 'wagmi',
        jsonRpcUrl: chain.foundry.rpcUrls.default,
      },
    })
    expect(connector.name).toEqual('Coinbase Wallet')
  })
})
