import { abi, mainnet, optimism } from '@wagmi/test'
import { assertType, expectTypeOf, test } from 'vitest'

import { createUseReadContract } from './createUseReadContract.js'

test('default', () => {
  const useReadErc20 = createUseReadContract({
    abi: abi.erc20,
  })

  const result = useReadErc20({
    functionName: 'balanceOf',
    args: ['0x'],
    chainId: 123,
  })
  expectTypeOf(result.data).toEqualTypeOf<bigint | undefined>()
})

test('select data', () => {
  const useReadErc20 = createUseReadContract({
    abi: abi.erc20,
  })

  const result = useReadErc20({
    address: '0x',
    functionName: 'balanceOf',
    args: ['0x'],
    query: {
      select(data) {
        expectTypeOf(data).toEqualTypeOf<bigint>()
        return data?.toString()
      },
    },
  })
  expectTypeOf(result.data).toEqualTypeOf<string | undefined>()
})

test('multichain address', () => {
  const useReadErc20 = createUseReadContract({
    abi: abi.erc20,
    address: {
      [mainnet.id]: '0x',
      [optimism.id]: '0x',
    },
  })

  const result = useReadErc20({
    functionName: 'balanceOf',
    args: ['0x'],
    chainId: mainnet.id,
    // ^?
  })
  assertType<bigint | undefined>(result.data)

  useReadErc20({
    functionName: 'balanceOf',
    args: ['0x'],
    // @ts-expect-error chain id must match address keys
    chainId: 420,
  })

  useReadErc20({
    functionName: 'balanceOf',
    args: ['0x'],
    // @ts-expect-error address not allowed
    address: '0x',
  })
})

test('overloads', () => {
  const useReadViewOverloads = createUseReadContract({
    abi: abi.viewOverloads,
  })

  const result1 = useReadViewOverloads({
    functionName: 'foo',
  })
  assertType<number | undefined>(result1.data)

  const result2 = useReadViewOverloads({
    functionName: 'foo',
    args: [],
  })
  assertType<number | undefined>(result2.data)

  const result3 = useReadViewOverloads({
    functionName: 'foo',
    args: ['0x'],
  })
  // @ts-ignore – TODO: Fix https://github.com/wevm/viem/issues/1916
  assertType<string | undefined>(result3.data)

  const result4 = useReadViewOverloads({
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
  >(result4.data)
})

test('functionName', () => {
  const useReadErc20BalanceOf = createUseReadContract({
    abi: abi.erc20,
    address: '0x',
    functionName: 'balanceOf',
  })

  const result = useReadErc20BalanceOf({
    args: ['0x'],
    chainId: 1,
  })
  expectTypeOf(result.data).toEqualTypeOf<bigint | undefined>()
})

test('functionName with overloads', () => {
  const useReadViewOverloads = createUseReadContract({
    abi: abi.viewOverloads,
    functionName: 'foo',
  })

  const result1 = useReadViewOverloads()
  assertType<number | undefined>(result1.data)

  const result2 = useReadViewOverloads({
    args: [],
  })
  assertType<number | undefined>(result2.data)

  const result3 = useReadViewOverloads({
    args: ['0x'],
  })
  // @ts-ignore – TODO: Fix https://github.com/wevm/viem/issues/1916
  assertType<string | undefined>(result3.data)

  const result4 = useReadViewOverloads({
    args: ['0x', '0x'],
  })
  assertType<
    | {
        foo: `0x${string}`
        bar: `0x${string}`
      }
    | undefined
    // @ts-ignore – TODO: Fix https://github.com/wevm/viem/issues/1916
  >(result4.data)
})
