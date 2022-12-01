import WalletConnectProvider from '@walletconnect/ethereum-provider'
import { UniversalProvider } from '@walletconnect/universal-provider'
import { describe, expect, it } from 'vitest'

import { chain, defaultChains } from '../constants'
import { WalletConnectConnector } from './walletConnect'

describe('WalletConnectConnector', () => {
  it('inits', () => {
    const connector = new WalletConnectConnector({
      chains: defaultChains,
      options: {
        rpc: {
          [chain.foundry.id]: chain.foundry.rpcUrls.default,
        },
      },
    })
    expect(connector.name).toEqual('WalletConnect')
  })

  it('should use v1 by default', async () => {
    const connector = new WalletConnectConnector({
      chains: defaultChains,
      options: {
        rpc: {
          [chain.foundry.id]: chain.foundry.rpcUrls.default,
        },
      },
    })
    expect(await connector.getProvider()).instanceOf(WalletConnectProvider)
  })

  it('should use v1 as configured by options', async () => {
    const connector = new WalletConnectConnector({
      chains: defaultChains,
      options: {
        rpc: {
          [chain.foundry.id]: chain.foundry.rpcUrls.default,
        },
        version: '1',
      },
    })
    expect(await connector.getProvider()).instanceOf(WalletConnectProvider)
  })

  it('should use v2 as configured by options', async () => {
    const connector = new WalletConnectConnector({
      chains: defaultChains,
      options: {
        projectId: 'test',
        version: '2',
      },
    })
    expect(await connector.getProvider()).instanceOf(UniversalProvider)
  })
})
