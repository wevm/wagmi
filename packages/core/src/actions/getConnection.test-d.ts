import { config } from '@wagmi/test'
import type { Address } from 'viem'
import { expectTypeOf, test } from 'vitest'

import type { Connector } from '../createConfig.js'
import { getConnection } from './getConnection.js'

test('states', () => {
  const result = getConnection(config)

  switch (result.status) {
    case 'reconnecting': {
      expectTypeOf(result).toMatchTypeOf<{
        address: Address | undefined
        chain: (typeof config)['chains'][number] | undefined
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
      expectTypeOf(result).toMatchTypeOf<{
        address: Address | undefined
        chain: (typeof config)['chains'][number] | undefined
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
      expectTypeOf(result).toMatchTypeOf<{
        address: Address
        chain: (typeof config)['chains'][number] | undefined
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
      expectTypeOf(result).toMatchTypeOf<{
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
