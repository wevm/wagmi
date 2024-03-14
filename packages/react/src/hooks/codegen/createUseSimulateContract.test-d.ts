import { abi, mainnet, optimism } from '@wagmi/test'
import { type Address } from 'viem'
import { assertType, expectTypeOf, test } from 'vitest'

import { createUseSimulateContract } from './createUseSimulateContract.js'

test('default', () => {
  const useSimulateErc20 = createUseSimulateContract({
    abi: abi.erc20,
  })

  const result = useSimulateErc20({
    functionName: 'transferFrom',
    args: ['0x', '0x', 123n],
    chainId: 123,
  })
  result.data?.request.chainId
  expectTypeOf(result.data).toMatchTypeOf<
    | {
        result: boolean
        request: {
          __mode: 'prepared'
          chainId: 123
          abi: readonly [
            {
              readonly name: 'transferFrom'
              readonly type: 'function'
              readonly stateMutability: 'nonpayable'
              readonly inputs: readonly [
                { readonly type: 'address'; readonly name: 'sender' },
                { readonly type: 'address'; readonly name: 'recipient' },
                { readonly type: 'uint256'; readonly name: 'amount' },
              ]
              readonly outputs: readonly [{ type: 'bool' }]
            },
          ]
          functionName: 'transferFrom'
          args: readonly [Address, Address, bigint]
        }
      }
    | undefined
  >()
})

test('select data', () => {
  const useSimulateErc20 = createUseSimulateContract({
    abi: abi.erc20,
  })

  const result = useSimulateErc20({
    address: '0x',
    functionName: 'transferFrom',
    args: ['0x', '0x', 123n],
    query: {
      select(data) {
        expectTypeOf(data.result).toEqualTypeOf<boolean>()
        return data?.toString()
      },
    },
  })
  expectTypeOf(result.data).toEqualTypeOf<string | undefined>()
})

test('multichain address', () => {
  const useSimulateErc20 = createUseSimulateContract({
    abi: abi.erc20,
    address: {
      [mainnet.id]: '0x',
      [optimism.id]: '0x',
    },
  })

  const result = useSimulateErc20({
    functionName: 'transferFrom',
    args: ['0x', '0x', 123n],
    chainId: optimism.id,
  })
  expectTypeOf(result.data?.result).toEqualTypeOf<boolean | undefined>()

  useSimulateErc20({
    functionName: 'transferFrom',
    args: ['0x', '0x', 123n],
    // @ts-expect-error chain id must match address keys
    chainId: 420,
  })

  useSimulateErc20({
    functionName: 'transferFrom',
    args: ['0x', '0x', 123n],
    // @ts-expect-error address not allowed
    address: '0x',
  })
})

test('overloads', () => {
  const useSimulateWriteOverloads = createUseSimulateContract({
    abi: abi.writeOverloads,
  })

  const result1 = useSimulateWriteOverloads({
    functionName: 'foo',
  })
  assertType<number | undefined>(result1.data?.result)

  const result2 = useSimulateWriteOverloads({
    functionName: 'foo',
    args: [],
  })
  assertType<number | undefined>(result2.data?.result)

  const result3 = useSimulateWriteOverloads({
    functionName: 'foo',
    args: ['0x'],
  })
  // @ts-ignore – TODO: Fix https://github.com/wevm/viem/issues/1916
  assertType<string | undefined>(result3.data?.result)

  const result4 = useSimulateWriteOverloads({
    functionName: 'foo',
    args: ['0x', '0x'],
  })
  assertType<
    | {
        foo: `0x${string}`
        bar: `0x${string}`
      }
    | undefined
    // @ts-ignore – TODO: Fix https://github.com/wevm/viem/issues/1916
  >(result4.data?.result)
})

test('functionName', () => {
  const useSimulateErc20 = createUseSimulateContract({
    abi: abi.erc20,
    functionName: 'transferFrom',
  })

  const result = useSimulateErc20({
    args: ['0x', '0x', 123n],
    chainId: 123,
  })
  result.data?.request.chainId
  expectTypeOf(result.data).toMatchTypeOf<
    | {
        result: boolean
        request: {
          __mode: 'prepared'
          chainId: 123
          abi: readonly [
            {
              readonly name: 'transferFrom'
              readonly type: 'function'
              readonly stateMutability: 'nonpayable'
              readonly inputs: readonly [
                { readonly type: 'address'; readonly name: 'sender' },
                { readonly type: 'address'; readonly name: 'recipient' },
                { readonly type: 'uint256'; readonly name: 'amount' },
              ]
              readonly outputs: readonly [{ type: 'bool' }]
            },
          ]
          functionName: 'transferFrom'
          args: readonly [Address, Address, bigint]
        }
      }
    | undefined
  >()
})

test('functionName with overloads', () => {
  const useSimulateWriteOverloads = createUseSimulateContract({
    abi: abi.writeOverloads,
    functionName: 'foo',
  })

  const result1 = useSimulateWriteOverloads({})
  assertType<number | undefined>(result1.data?.result)

  const result2 = useSimulateWriteOverloads({
    args: [],
  })
  assertType<number | undefined>(result2.data?.result)

  const result3 = useSimulateWriteOverloads({
    args: ['0x'],
  })
  // @ts-ignore – TODO: Fix https://github.com/wevm/viem/issues/1916
  assertType<string | undefined>(result3.data?.result)

  const result4 = useSimulateWriteOverloads({
    args: ['0x', '0x'],
  })
  assertType<
    | {
        foo: `0x${string}`
        bar: `0x${string}`
      }
    | undefined
    // @ts-ignore – TODO: Fix https://github.com/wevm/viem/issues/1916
  >(result4.data?.result)
})
