import { abi, config } from '@wagmi/test'
import { http, type Address, parseAbi } from 'viem'
import { celo, mainnet } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'

import { createConfig } from '../createConfig.js'
import { simulateContract } from './simulateContract.js'
import { type WriteContractParameters, writeContract } from './writeContract.js'

test('default', async () => {
  await writeContract(config, {
    address: '0x',
    abi: abi.erc20,
    functionName: 'transferFrom',
    args: ['0x', '0x', 123n],
    chainId: 1,
  })
})

test('simulateContract', async () => {
  const { request } = await simulateContract(config, {
    account: '0x',
    address: '0x',
    abi: abi.erc20,
    functionName: 'transferFrom',
    args: ['0x', '0x', 123n],
    chainId: 1,
  })
  await writeContract(config, request)
  await writeContract(config, {
    __mode: 'prepared',
    address: '0x',
    abi: abi.erc20,
    functionName: 'transferFrom',
    args: ['0x', '0x', 123n],
  })
})

test('chain formatters', () => {
  const config = createConfig({
    chains: [mainnet, celo],
    transports: { [celo.id]: http(), [mainnet.id]: http() },
  })

  type Result = WriteContractParameters<
    typeof abi.erc20,
    'transferFrom',
    [Address, Address, bigint],
    typeof config
  >
  expectTypeOf<Result>().toMatchTypeOf<{
    chainId?: typeof celo.id | typeof mainnet.id | undefined
    feeCurrency?: `0x${string}` | undefined
  }>()
  writeContract(config, {
    address: '0x',
    abi: abi.erc20,
    functionName: 'transferFrom',
    args: ['0x', '0x', 123n],
    feeCurrency: '0x',
  })

  type Result2 = WriteContractParameters<
    typeof abi.erc20,
    'transferFrom',
    [Address, Address, bigint],
    typeof config,
    typeof celo.id
  >
  expectTypeOf<Result2>().toMatchTypeOf<{
    functionName: 'approve' | 'transfer' | 'transferFrom'
    args: readonly [Address, Address, bigint]
    feeCurrency?: `0x${string}` | undefined
  }>()
  writeContract(config, {
    chainId: celo.id,
    address: '0x',
    abi: abi.erc20,
    functionName: 'transferFrom',
    args: ['0x', '0x', 123n],
    feeCurrency: '0x',
  })

  type Result3 = WriteContractParameters<
    typeof abi.erc20,
    'transferFrom',
    [Address, Address, bigint],
    typeof config,
    typeof mainnet.id
  >
  expectTypeOf<Result3>().toMatchTypeOf<{
    functionName: 'approve' | 'transfer' | 'transferFrom'
    args: readonly [Address, Address, bigint]
  }>()
  expectTypeOf<Result3>().not.toMatchTypeOf<{
    feeCurrency?: `0x${string}` | undefined
  }>()
  writeContract(config, {
    chainId: mainnet.id,
    address: '0x',
    abi: abi.erc20,
    functionName: 'transferFrom',
    args: ['0x', '0x', 123n],
    // @ts-expect-error
    feeCurrency: '0x',
  })
})

test('overloads', async () => {
  const abi = parseAbi([
    'function foo() returns (int8)',
    'function foo(address) returns (string)',
    'function foo(address, address) returns ((address foo, address bar))',
    'function bar(uint256) returns (int8)',
  ])

  type Result = WriteContractParameters<typeof abi, 'foo'>
  expectTypeOf<Result['functionName']>().toEqualTypeOf<'foo' | 'bar'>()
  expectTypeOf<Result['args']>().toEqualTypeOf<
    | readonly []
    | readonly [`0x${string}`]
    | readonly [`0x${string}`, `0x${string}`]
    | undefined
  >()
  writeContract(config, {
    address: '0x',
    abi,
    functionName: 'foo',
  })
  writeContract(config, {
    address: '0x',
    abi,
    functionName: 'foo',
    args: ['0x'],
  })
  writeContract(config, {
    address: '0x',
    abi,
    functionName: 'foo',
    args: ['0x', '0x'],
  })
  writeContract(config, {
    address: '0x',
    abi,
    functionName: 'foo',
    // @ts-expect-error
    args: ['0x', 123n],
  })

  type Result2 = WriteContractParameters<typeof abi, 'bar'>
  expectTypeOf<Result2['functionName']>().toEqualTypeOf<'foo' | 'bar'>()
  expectTypeOf<Result2['args']>().toEqualTypeOf<readonly [bigint]>()
})
