import { type Connector } from '@wagmi/core'
import { type Address, type Chain } from 'viem'
import { expectTypeOf, test } from 'vitest'

import { createAccount } from './createAccount.js'

test('states', () => {
  const { account } = createAccount()

  switch (account.status) {
    case 'reconnecting': {
      expectTypeOf(account).toMatchTypeOf<{
        address: Address | undefined
        chain: Chain | undefined
        chainId: number | undefined
        connector: Connector | undefined
        isConnected: boolean
        isConnecting: false
        isDisconnected: false
        isReconnecting: true
        status: 'reconnecting'
      }>()
      break
    }
    case 'connecting': {
      expectTypeOf(account).toMatchTypeOf<{
        address: Address | undefined
        chain: Chain | undefined
        chainId: number | undefined
        connector: Connector | undefined
        isConnected: false
        isReconnecting: false
        isConnecting: true
        isDisconnected: false
        status: 'connecting'
      }>()
      break
    }
    case 'connected': {
      expectTypeOf(account).toMatchTypeOf<{
        address: Address
        chain: Chain | undefined
        chainId: number
        connector: Connector
        isConnected: true
        isConnecting: false
        isDisconnected: false
        isReconnecting: false
        status: 'connected'
      }>()
      break
    }
    case 'disconnected': {
      expectTypeOf(account).toMatchTypeOf<{
        address: undefined
        chain: undefined
        chainId: undefined
        connector: undefined
        isConnected: false
        isReconnecting: false
        isConnecting: false
        isDisconnected: true
        status: 'disconnected'
      }>()
      break
    }
  }
})
