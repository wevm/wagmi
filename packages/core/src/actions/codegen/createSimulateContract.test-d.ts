import { abi, config, mainnet, optimism } from '@wagmi/test'
import { http, type Address } from 'viem'
import { celo } from 'viem/chains'
import { assertType, expectTypeOf, test } from 'vitest'

import { createConfig } from '../../createConfig.js'
import { createSimulateContract } from './createSimulateContract.js'

test('default', async () => {
  const simulateErc20 = createSimulateContract({
    abi: abi.erc20,
    address: '0x',
  })

  const result = await simulateErc20(config, {
    functionName: 'transferFrom',
    args: ['0x', '0x', 123n],
    chainId: 1,
  })

  expectTypeOf(result).toMatchTypeOf<{
    result: boolean
    request: {
      __mode: 'prepared'
      chainId: 1
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
  }>()
})

test('multichain address', async () => {
  const simulateErc20 = createSimulateContract({
    abi: abi.erc20,
    address: {
      [mainnet.id]: '0x',
      [optimism.id]: '0x',
    },
  })

  const result = await simulateErc20(config, {
    functionName: 'transferFrom',
    args: ['0x', '0x', 123n],
    chainId: optimism.id,
  })
  expectTypeOf(result.result).toEqualTypeOf<boolean>()

  simulateErc20(config, {
    functionName: 'transferFrom',
    args: ['0x', '0x', 123n],
    // @ts-expect-error chain id must match address keys
    chainId: 420,
  })

  simulateErc20(config, {
    functionName: 'transferFrom',
    args: ['0x', '0x', 123n],
    // @ts-expect-error address not allowed
    address: '0x',
  })
})

test('overloads', async () => {
  const simulateWriteOverloads = createSimulateContract({
    abi: abi.writeOverloads,
    address: '0x',
  })

  const result1 = await simulateWriteOverloads(config, {
    functionName: 'foo',
  })
  assertType<number | undefined>(result1.result)

  const result2 = await simulateWriteOverloads(config, {
    functionName: 'foo',
    args: [],
  })
  assertType<number | undefined>(result2.result)

  const result3 = await simulateWriteOverloads(config, {
    functionName: 'foo',
    args: ['0x'],
  })
  // @ts-ignore – TODO: Fix https://github.com/wevm/viem/issues/1916
  assertType<string | undefined>(result3.result)

  const result4 = await simulateWriteOverloads(config, {
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
  >(result4.result)
})

test('functionName', async () => {
  const simulateErc20 = createSimulateContract({
    abi: abi.erc20,
    address: '0x',
    functionName: 'transferFrom',
  })

  const result = await simulateErc20(config, {
    args: ['0x', '0x', 123n],
    chainId: 1,
  })

  expectTypeOf(result).toMatchTypeOf<{
    result: boolean
    request: {
      __mode: 'prepared'
      chainId: 1
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
  }>()
})

test('functionName with overloads', async () => {
  const simulateWriteOverloads = createSimulateContract({
    abi: abi.writeOverloads,
    address: '0x',
    functionName: 'foo',
  })

  const result1 = await simulateWriteOverloads(config, {})
  assertType<number | undefined>(result1.result)

  const result2 = await simulateWriteOverloads(config, {
    args: [],
  })
  assertType<number | undefined>(result2.result)

  const result3 = await simulateWriteOverloads(config, {
    args: ['0x'],
  })
  // @ts-ignore – TODO: Fix https://github.com/wevm/viem/issues/1916
  assertType<string | undefined>(result3.result)

  const result4 = await simulateWriteOverloads(config, {
    args: ['0x', '0x'],
  })
  assertType<
    | {
        foo: `0x${string}`
        bar: `0x${string}`
      }
    | undefined
    // @ts-ignore – TODO: Fix https://github.com/wevm/viem/issues/1916
  >(result4.result)
})

test('chain formatters', async () => {
  const simulateErc20 = createSimulateContract({
    abi: abi.erc20,
    address: '0x',
  })

  const config = createConfig({
    chains: [celo, mainnet],
    transports: { [celo.id]: http(), [mainnet.id]: http() },
  })

  const response = await simulateErc20(config, {
    functionName: 'transferFrom',
    args: ['0x', '0x', 123n],
  })
  if (response.chainId === celo.id) {
    expectTypeOf(response.request.feeCurrency).toEqualTypeOf<
      `0x${string}` | undefined
    >()
    expectTypeOf(response.request.gatewayFee).toEqualTypeOf<
      bigint | undefined
    >()
    expectTypeOf(response.request.gatewayFeeRecipient).toEqualTypeOf<
      `0x${string}` | undefined
    >()
  }

  const response2 = await simulateErc20(config, {
    functionName: 'transferFrom',
    args: ['0x', '0x', 123n],
    chainId: celo.id,
  })
  expectTypeOf(response2.request.feeCurrency).toEqualTypeOf<
    `0x${string}` | undefined
  >()
  expectTypeOf(response2.request.gatewayFee).toEqualTypeOf<bigint | undefined>()
  expectTypeOf(response2.request.gatewayFeeRecipient).toEqualTypeOf<
    `0x${string}` | undefined
  >()
})
