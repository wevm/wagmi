import { abi, config } from '@wagmi/test'
import { assertType, expectTypeOf, test } from 'vitest'

import { readContracts } from './readContracts.js'

test('default', async () => {
  const result = await readContracts(config, {
    contracts: [
      {
        address: '0x',
        abi: abi.erc20,
        functionName: 'balanceOf',
        args: ['0x'],
        chainId: 1,
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
  const result = await readContracts(config, {
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

test('overloads', async () => {
  const result1 = await readContracts(config, {
    allowFailure: false,
    contracts: [
      {
        address: '0x',
        abi: abi.viewOverloads,
        functionName: 'foo',
      },
    ],
  })
  assertType<[number] | undefined>(result1)

  const result2 = await readContracts(config, {
    allowFailure: false,
    contracts: [
      {
        address: '0x',
        abi: abi.viewOverloads,
        functionName: 'foo',
        args: [],
      },
    ],
  })
  assertType<[number] | undefined>(result2)

  const result3 = await readContracts(config, {
    allowFailure: false,
    contracts: [
      {
        address: '0x',
        abi: abi.viewOverloads,
        functionName: 'foo',
        args: ['0x'],
      },
    ],
  })
  assertType<[string] | undefined>(result3)

  const result4 = await readContracts(config, {
    allowFailure: false,
    contracts: [
      {
        address: '0x',
        abi: abi.viewOverloads,
        functionName: 'foo',
        args: ['0x', '0x'],
      },
    ],
  })
  assertType<
    | [
        {
          foo: `0x${string}`
          bar: `0x${string}`
        },
      ]
    | undefined
  >(result4)
})
