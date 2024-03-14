import { abi, config } from '@wagmi/test'
import { assertType, expectTypeOf, test } from 'vitest'

import { readContract } from './readContract.js'

test('default', async () => {
  const result = await readContract(config, {
    address: '0x',
    abi: abi.erc20,
    functionName: 'balanceOf',
    args: ['0x'],
  })
  expectTypeOf(result).toEqualTypeOf<bigint>()
})

test('overloads', async () => {
  const result1 = await readContract(config, {
    address: '0x',
    abi: abi.viewOverloads,
    functionName: 'foo',
  })
  assertType<number>(result1)

  const result2 = await readContract(config, {
    address: '0x',
    abi: abi.viewOverloads,
    functionName: 'foo',
    args: [],
  })
  assertType<number>(result2)

  const result3 = await readContract(config, {
    address: '0x',
    abi: abi.viewOverloads,
    functionName: 'foo',
    args: ['0x'],
  })
  // @ts-ignore – TODO: Fix https://github.com/wevm/viem/issues/1916
  assertType<string>(result3)

  const result4 = await readContract(config, {
    address: '0x',
    abi: abi.viewOverloads,
    functionName: 'foo',
    args: ['0x', '0x'],
  })
  assertType<{
    foo: `0x${string}`
    bar: `0x${string}`
    // @ts-ignore – TODO: Fix https://github.com/wevm/viem/issues/1916
  }>(result4)
})
