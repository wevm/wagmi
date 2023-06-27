import {
  type ConnectError,
  type Connector,
  type CreateConnectorFn,
} from '@wagmi/core'
import { config } from '@wagmi/test'
import type { Address } from 'viem'
import { expectTypeOf, test } from 'vitest'

import { useConnect } from './useConnect.js'

const connector = config.connectors[0]!
const contextValue = { foo: 'bar' } as const

test('required', () => {
  expectTypeOf(useConnect().connect)
    .parameter(0)
    .toMatchTypeOf<{ connector: Connector | CreateConnectorFn }>()

  // @ts-expect-error
  useConnect().connect()
})

test('optional', () => {
  expectTypeOf(useConnect({ connector }).connect)
    .parameter(0)
    .toMatchTypeOf<
      { connector?: Connector | CreateConnectorFn | undefined } | undefined
    >()
})

test('context', () => {
  useConnect({
    connector,
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
})
