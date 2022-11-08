import WalletConnectProvider from '@walletconnect/ethereum-provider'
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
    expect((await connector.getProvider()) instanceof WalletConnectProvider).to
      .be.true
    expect(connector.name).toEqual('WalletConnect')
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
    expect((await connector.getProvider()) instanceof WalletConnectProvider).to
      .be.true
    expect(connector.name).toEqual('WalletConnect')
  })
  it('should use v2 as configured by options', async () => {
    const connector = new WalletConnectConnector({
      chains: defaultChains,
      options: {
        rpc: {
          [chain.foundry.id]: chain.foundry.rpcUrls.default,
        },
        version: '2',
      },
    })
    expect(connector.getProvider()).rejects.toThrowError(
      'Please get a WalletConnect v2 projectID from https://cloud.walletconnect.com/',
    )
    expect(connector.name).toEqual('WalletConnect')
  })
})
