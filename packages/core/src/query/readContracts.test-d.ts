import { abi, config } from '@wagmi/test'
import { assertType, expectTypeOf, test } from 'vitest'

import { readContractsQueryOptions } from './readContracts.js'

const context = {} as any

test('default', async () => {
  const options = readContractsQueryOptions(config, {
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
  const result = await options.queryFn({} as any)
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

test('allowFailure: false', async () => {
  const options = readContractsQueryOptions(config, {
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
  const result = await options.queryFn({} as any)
  expectTypeOf(result).toEqualTypeOf<[bigint, string]>()
})

test('overloads', async () => {
  {
    const options = readContractsQueryOptions(config, {
      allowFailure: false,
      contracts: [
        { address: '0x', abi: abi.viewOverloads, functionName: 'foo' },
      ],
    })
    const result = await options.queryFn(context)
    assertType<[number]>(result)
  }
  {
    const options = readContractsQueryOptions(config, {
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
    const result = await options.queryFn(context)
    assertType<[number]>(result)
  }
  {
    const options = readContractsQueryOptions(config, {
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
    const result = await options.queryFn(context)
    assertType<[string]>(result)
  }
  {
    const options = readContractsQueryOptions(config, {
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
    const result = await options.queryFn(context)
    assertType<
      [
        {
          foo: `0x${string}`
          bar: `0x${string}`
        },
      ]
    >(result)
  }
})
