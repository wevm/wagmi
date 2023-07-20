import {
  type SignTypedDataError,
  type SignTypedDataReturnType,
} from '@wagmi/core'
import type { SignTypedDataVariables } from '@wagmi/core/query'
import { typedData } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'

import { useSignTypedData } from './useSignTypedData.js'

const contextValue = { foo: 'bar' } as const

test('context', () => {
  const { context, data, error, signTypedData, variables } = useSignTypedData({
    onMutate(variables) {
      expectTypeOf(variables).toMatchTypeOf<SignTypedDataVariables>()
      return contextValue
    },
    onError(error, variables, context) {
      expectTypeOf(variables).toMatchTypeOf<SignTypedDataVariables>()
      expectTypeOf(error).toEqualTypeOf<SignTypedDataError>()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(variables).toMatchTypeOf<SignTypedDataVariables>()
      expectTypeOf(data).toEqualTypeOf<SignTypedDataReturnType>()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<SignTypedDataReturnType | undefined>()
      expectTypeOf(error).toEqualTypeOf<SignTypedDataError | null>()
      expectTypeOf(variables).toMatchTypeOf<SignTypedDataVariables>()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
    },
  })

  expectTypeOf(data).toEqualTypeOf<SignTypedDataReturnType | undefined>()
  expectTypeOf(error).toEqualTypeOf<SignTypedDataError | null>()
  expectTypeOf(variables).toMatchTypeOf<SignTypedDataVariables | undefined>()
  expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()

  signTypedData(
    {
      types: typedData.basic.types,
      primaryType: 'Person',
      message: {
        name: 'Bob',
        wallet: '0x',
      },
    },
    {
      onError(error, variables, context) {
        expectTypeOf(variables).toMatchTypeOf<{
          types: typeof typedData.basic.types
          primaryType: 'Person' | 'Mail'
          message: {
            name: string
            wallet: `0x${string}`
          }
        }>()
        expectTypeOf(error).toEqualTypeOf<SignTypedDataError>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(variables).toMatchTypeOf<{
          types: typeof typedData.basic.types
          primaryType: 'Person' | 'Mail'
          message: {
            name: string
            wallet: `0x${string}`
          }
        }>()
        expectTypeOf(data).toEqualTypeOf<SignTypedDataReturnType>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<SignTypedDataReturnType | undefined>()
        expectTypeOf(error).toEqualTypeOf<SignTypedDataError | null>()
        expectTypeOf(variables).toMatchTypeOf<{
          types: typeof typedData.basic.types
          primaryType: 'Person' | 'Mail'
          message: {
            name: string
            wallet: `0x${string}`
          }
        }>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
    },
  )

  // signTypedData(
  //   {
  //     primaryType: 'EIP712Domain',
  //     domain: {},
  //   },
  //   {
  //     onError(error, variables, context) {
  //       expectTypeOf(variables).toMatchTypeOf<{
  //         primaryType: 'EIP712Domain'
  //         domain: Record<string, unknown>
  //         message?: undefined
  //       }>()
  //       expectTypeOf(error).toEqualTypeOf<SignTypedDataError>()
  //       expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
  //     },
  //     onSuccess(data, variables, context) {
  //       expectTypeOf(variables).toMatchTypeOf<{
  //         primaryType: 'EIP712Domain'
  //         domain: Record<string, unknown>
  //         message?: undefined
  //       }>()
  //       expectTypeOf(data).toEqualTypeOf<SignTypedDataReturnType>()
  //       expectTypeOf(context).toEqualTypeOf<typeof contextValue>()
  //     },
  //     onSettled(data, error, variables, context) {
  //       expectTypeOf(data).toEqualTypeOf<SignTypedDataReturnType | undefined>()
  //       expectTypeOf(error).toEqualTypeOf<SignTypedDataError | null>()
  //       expectTypeOf(variables).toMatchTypeOf<{
  //         primaryType: 'EIP712Domain'
  //         domain: Record<string, unknown>
  //         message?: undefined
  //       }>()
  //       expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
  //     },
  //   },
  // )

  // signTypedData(
  //   {
  //     types: {
  //       EIP712Domain: [{ type: 'uint256', name: 'chainId' }],
  //     },
  //     primaryType: 'EIP712Domain',
  //     domain: {
  //       chainId: 123n,
  //     },
  //   },
  //   {
  //     onError(error, variables, context) {
  //       expectTypeOf(variables).toMatchTypeOf<{
  //         primaryType: 'EIP712Domain'
  //         domain: Record<string, unknown>
  //         message?: undefined
  //       }>()
  //       expectTypeOf(error).toEqualTypeOf<SignTypedDataError>()
  //       expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
  //     },
  //     onSuccess(data, variables, context) {
  //       expectTypeOf(variables).toMatchTypeOf<{
  //         primaryType: 'EIP712Domain'
  //         domain: Record<string, unknown>
  //         message?: undefined
  //       }>()
  //       expectTypeOf(data).toEqualTypeOf<SignTypedDataReturnType>()
  //       expectTypeOf(context).toEqualTypeOf<typeof contextValue>()
  //     },
  //     onSettled(data, error, variables, context) {
  //       expectTypeOf(data).toEqualTypeOf<SignTypedDataReturnType | undefined>()
  //       expectTypeOf(error).toEqualTypeOf<SignTypedDataError | null>()
  //       expectTypeOf(variables).toMatchTypeOf<{
  //         primaryType: 'EIP712Domain'
  //         domain: Record<string, unknown>
  //         message?: undefined
  //       }>()
  //       expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
  //     },
  //   },
  // )
})
