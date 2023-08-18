import { abi, config } from '@wagmi/test'
import { type Address, parseAbi } from 'viem'
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
  const abi = parseAbi([
    'function foo() view returns (int8)',
    'function foo(address) view returns (string)',
    'function foo(address, address) view returns ((address foo, address bar))',
    'function bar() view returns (int8)',
  ])

  type Result = Parameters<
    typeof multicall<
      typeof config,
      [
        {
          address: '0x'
          abi: typeof abi
          functionName: 'foo'
        },
      ]
    >
  >[1]['contracts'][0]
  expectTypeOf<Result>().toEqualTypeOf<{
    address: Address
    abi: typeof abi
    functionName: 'foo' | 'bar'
    args?:
      | readonly []
      | readonly [Address]
      | readonly [Address, Address]
      | undefined
  }>()
})
