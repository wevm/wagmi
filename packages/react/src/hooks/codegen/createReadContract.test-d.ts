import { abi } from '@wagmi/test'
import { mainnet, optimism } from 'viem/chains'
import { assertType, test } from 'vitest'

import { createReadContract } from './createReadContract.js'

test('custom function with overloads', () => {
  const useReadViewOverloads = createReadContract({
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
})

test('custom function', () => {
  const useReadErc20 = createReadContract({
    abi: abi.erc20,
  })

  const result1 = useReadErc20({
    functionName: 'balanceOf',
    args: ['0x'],
  })
  assertType<bigint | undefined>(result1.data)
})

test('multichain address', () => {
  const useReadErc20 = createReadContract({
    abi: abi.erc20,
    address: {
      [mainnet.id]: '0x',
      [optimism.id]: '0x',
    },
  })

  const result1 = useReadErc20({
    functionName: 'balanceOf',
    args: ['0x'],
    chainId: mainnet.id,
  })
  assertType<bigint | undefined>(result1.data)

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
