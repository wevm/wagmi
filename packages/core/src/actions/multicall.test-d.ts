import { abi, config } from '@wagmi/test'
import type { Address } from 'viem'
import { expectTypeOf, test } from 'vitest'

import { multicall } from './multicall.js'

test('default', async () => {
  const result = await multicall(config, {
    chainId: 1,
    contracts: [
      {
        address: '0x',
        abi: abi.erc20,
        functionName: 'balanceOf',
        args: ['0x'],
      },
      {
        address: '0x',
        abi: abi.wagmiMintExample,
        functionName: 'tokenURI',
        args: [123n],
      },
    ],
  })
  expectTypeOf(result).toEqualTypeOf<
    [
      (
        | { error: Error; result?: undefined; status: 'failure' }
        | { error?: undefined; result: bigint; status: 'success' }
      ),
      (
        | { error: Error; result?: undefined; status: 'failure' }
        | { error?: undefined; result: string; status: 'success' }
      ),
    ]
  >()
})

test('allowFailure', async () => {
  const result = await multicall(config, {
    allowFailure: false,
    contracts: [
      {
        address: '0x',
        abi: abi.erc20,
        functionName: 'balanceOf',
        args: ['0x'],
      },
      {
        address: '0x',
        abi: abi.wagmiMintExample,
        functionName: 'tokenURI',
        args: [123n],
      },
    ],
  })
  expectTypeOf(result).toEqualTypeOf<[bigint, string]>()
})

test('MulticallParameters', async () => {
  type Result = Parameters<
    typeof multicall<
      typeof config,
      [
        {
          address: '0x'
          abi: typeof abi.viewOverloads
          functionName: 'foo'
        },
      ]
    >
  >[1]['contracts'][0]
  expectTypeOf<Result['functionName']>().toEqualTypeOf<'foo' | 'bar'>()
  expectTypeOf<Result['args']>().toEqualTypeOf<
    readonly [] | readonly [Address] | readonly [Address, Address] | undefined
  >()
})

test('overloads', async () => {
  const res = await multicall(config, {
    allowFailure: false,
    contracts: [
      {
        address: '0x',
        abi: abi.viewOverloads,
        functionName: 'foo',
      },
      {
        address: '0x',
        abi: abi.viewOverloads,
        functionName: 'foo',
        args: ['0x'],
      },
      {
        address: '0x',
        abi: abi.viewOverloads,
        functionName: 'foo',
        args: ['0x', '0x'],
      },
    ],
  })

  expectTypeOf(res).toEqualTypeOf<
    [number, string, { foo: Address; bar: Address }]
  >()
})
