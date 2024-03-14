import { abi, config, mainnet, optimism } from '@wagmi/test'
import { assertType, expectTypeOf, test } from 'vitest'

import { createReadContract } from './createReadContract.js'

test('default', async () => {
  const readErc20 = createReadContract({
    abi: abi.erc20,
    address: '0x',
  })

  const result = await readErc20(config, {
    functionName: 'balanceOf',
    args: ['0x'],
    chainId: 1,
  })
  expectTypeOf(result).toEqualTypeOf<bigint>()
})

test('multichain address', async () => {
  const readErc20 = createReadContract({
    abi: abi.erc20,
    address: {
      [mainnet.id]: '0x',
      [optimism.id]: '0x',
    },
  })

  const result = await readErc20(config, {
    functionName: 'balanceOf',
    args: ['0x'],
    chainId: mainnet.id,
    // ^?
  })
  assertType<bigint>(result)

  readErc20(config, {
    functionName: 'balanceOf',
    args: ['0x'],
    // @ts-expect-error chain id must match address keys
    chainId: 420,
  })

  readErc20(config, {
    functionName: 'balanceOf',
    args: ['0x'],
    // @ts-expect-error address not allowed
    address: '0x',
  })
})

test('overloads', async () => {
  const readViewOverloads = createReadContract({
    abi: abi.viewOverloads,
    address: '0x',
  })

  const result1 = await readViewOverloads(config, {
    functionName: 'foo',
  })
  assertType<number>(result1)

  const result2 = await readViewOverloads(config, {
    functionName: 'foo',
    args: [],
  })
  assertType<number>(result2)

  const result3 = await readViewOverloads(config, {
    functionName: 'foo',
    args: ['0x'],
  })
  // @ts-ignore – TODO: Fix https://github.com/wevm/viem/issues/1916
  assertType<string>(result3)

  const result4 = await readViewOverloads(config, {
    functionName: 'foo',
    args: ['0x', '0x'],
  })
  assertType<{
    foo: `0x${string}`
    bar: `0x${string}`
    // @ts-ignore – TODO: Fix https://github.com/wevm/viem/issues/1916
  }>(result4)
})

test('functionName', async () => {
  const readErc20BalanceOf = createReadContract({
    abi: abi.erc20,
    address: '0x',
    functionName: 'balanceOf',
  })

  const result = await readErc20BalanceOf(config, {
    args: ['0x'],
    chainId: 1,
  })
  expectTypeOf(result).toEqualTypeOf<bigint>()
})

test('functionName with overloads', async () => {
  const readViewOverloads = createReadContract({
    abi: abi.viewOverloads,
    address: '0x',
    functionName: 'foo',
  })

  const result1 = await readViewOverloads(config, {})
  assertType<number>(result1)

  const result2 = await readViewOverloads(config, {
    args: [],
  })
  assertType<number>(result2)

  const result3 = await readViewOverloads(config, {
    args: ['0x'],
  })
  // @ts-ignore – TODO: Fix https://github.com/wevm/viem/issues/1916
  assertType<string>(result3)

  const result4 = await readViewOverloads(config, {
    args: ['0x', '0x'],
  })
  assertType<{
    foo: `0x${string}`
    bar: `0x${string}`
    // @ts-ignore – TODO: Fix https://github.com/wevm/viem/issues/1916
  }>(result4)
})
