import {
  type ConnectError,
  type Connector,
  type CreateConnectorFn,
} from '@wagmi/core'
import { config } from '@wagmi/test'
import type { Address } from 'viem'
import { mainnet } from 'viem/chains'
import { expectTypeOf } from 'vitest'

import { useConnect } from '../useConnect.js'

const connector = config.connectors[0]!
const contextValue = { foo: 'bar' } as const

// required mutation function parameter
useConnect().connect({ connector })
//                     ^?
// @ts-expect-error
useConnect().connect()
useConnect({
  mutation: {
    onSuccess(_, variables) {
      expectTypeOf(variables.connector).toEqualTypeOf<
        Connector | CreateConnectorFn
      >()
    },
  },
})

// optional mutation function parameter
useConnect({ connector }).connect()
//                        ^?
useConnect({ connector }).connect({
  connector,
  // ^?
})
useConnect({
  connector,
  mutation: {
    onSuccess(_, variables) {
      expectTypeOf(variables.connector).toEqualTypeOf<
        Connector | CreateConnectorFn
      >()
    },
  },
})

// context
useConnect({
  connector,
  mutation: {
    onMutate(variables) {
      expectTypeOf(variables).toEqualTypeOf<{
        chainId?: number | undefined
        connector: Connector | CreateConnectorFn
      }>()
      return contextValue
    },
    onError(error, variables, context) {
      expectTypeOf(variables).toEqualTypeOf<{
        chainId?: number | undefined
        connector: Connector | CreateConnectorFn
      }>()
      expectTypeOf(error).toEqualTypeOf<ConnectError>()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(variables).toEqualTypeOf<{
        chainId?: number | undefined
        connector: Connector | CreateConnectorFn
      }>()
      expectTypeOf(data).toEqualTypeOf<{
        accounts: readonly Address[]
        chainId: number
      }>()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        | {
            accounts: readonly Address[]
            chainId: number
          }
        | undefined
      >()
      expectTypeOf(error).toEqualTypeOf<ConnectError | null>()
      expectTypeOf(variables).toEqualTypeOf<{
        chainId?: number | undefined
        connector: Connector | CreateConnectorFn
      }>()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
    },
  },
}).connect(undefined, {
  onError(error, variables, context) {
    expectTypeOf(variables).toEqualTypeOf<{
      chainId?: number | undefined
      connector: Connector | CreateConnectorFn
    }>()
    expectTypeOf(error).toEqualTypeOf<ConnectError>()
    expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
  },
  onSuccess(data, variables, context) {
    expectTypeOf(variables).toEqualTypeOf<{
      chainId?: number | undefined
      connector: Connector | CreateConnectorFn
    }>()
    expectTypeOf(data).toEqualTypeOf<{
      accounts: readonly Address[]
      chainId: number
    }>()
    expectTypeOf(context).toEqualTypeOf<typeof contextValue>()
  },
  onSettled(data, error, variables, context) {
    expectTypeOf(data).toEqualTypeOf<
      | {
          accounts: readonly Address[]
          chainId: number
        }
      | undefined
    >()
    expectTypeOf(error).toEqualTypeOf<ConnectError | null>()
    expectTypeOf(variables).toEqualTypeOf<{
      chainId?: number | undefined
      connector: Connector | CreateConnectorFn
    }>()
    expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
  },
})

// config register
useConnect({ chainId: mainnet.id })
//           ^?
