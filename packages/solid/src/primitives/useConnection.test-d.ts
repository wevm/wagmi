import type { Connector } from '@wagmi/core'
import type { Address, Chain } from 'viem'
import { expectTypeOf, test } from 'vitest'

import { useConnection } from './useConnection.js'

test('states', () => {
  const result = useConnection()
  const connection = result()

  switch (connection.status) {
    case 'reconnecting': {
      expectTypeOf(connection).toMatchTypeOf<{
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
      expectTypeOf(connection).toMatchTypeOf<{
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
      expectTypeOf(connection).toMatchTypeOf<{
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
      expectTypeOf(connection).toMatchTypeOf<{
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
