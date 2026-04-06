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
  >(result4.data)

  useReadViewOverloads({
    // @ts-expect-error invalid functionName
    functionName: 'invalid',
  })

  useReadViewOverloads({
    functionName: 'foo',
    // @ts-expect-error too many args
    args: ['0x', '0x', '0x'],
  })
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
  >(result4.data)
})

test('narrows data for functions with matching argument shapes', () => {
  const abiSameArgsDifferentReturns = [
    {
      type: 'function',
      name: 'foo',
      stateMutability: 'view',
      inputs: [{ name: 'ilk', type: 'bytes32' }],
      outputs: [{ type: 'uint256' }],
    },
    {
      type: 'function',
      name: 'bar',
      stateMutability: 'view',
      inputs: [{ name: 'ilk', type: 'bytes32' }],
      outputs: [
        { name: 'art', type: 'uint256' },
        { name: 'rate', type: 'uint256' },
      ],
    },
  ] as const
  const useReadContractSameArgs = createUseReadContract({
    abi: abiSameArgsDifferentReturns,
  })

  {
    const result = useReadContractSameArgs({
      functionName: 'foo',
      args: [
        '0x0000000000000000000000000000000000000000000000000000000000000000',
      ],
    })
    assertType<bigint | undefined>(result.data)
  }
  {
    const result = useReadContractSameArgs({
      functionName: 'bar',
      args: [
        '0x0000000000000000000000000000000000000000000000000000000000000000',
      ],
    })
    assertType<readonly [bigint, bigint] | undefined>(result.data)
  }

  useReadContractSameArgs({
    // @ts-expect-error invalid functionName
    functionName: 'baz',
  })

  useReadContractSameArgs({
    functionName: 'foo',
    // @ts-expect-error wrong args for foo (expects bytes32)
    args: [123n],
  })

  useReadContractSameArgs({
    functionName: 'foo',
    // @ts-expect-error abi not allowed on generated hook
    abi: abiSameArgsDifferentReturns,
  })
})
