import { abi } from '@wagmi/test'
import { assertType, expectTypeOf, test } from 'vitest'

import { useReadContracts } from './useReadContracts.js'

test('select data', () => {
  const result = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        address: '0x',
        abi: abi.erc20,
        functionName: 'balanceOf',
        chainId: 1,
        args: ['0x'],
      },
      {
        address: '0x',
        abi: abi.wagmiMintExample,
        functionName: 'tokenURI',
        args: [123n],
      },
    ],
    query: {
      select(data) {
        expectTypeOf(data).toEqualTypeOf<[bigint, string]>()
        return data[0]
      },
    },
  })
  expectTypeOf(result.data).toEqualTypeOf<bigint | undefined>()
})

test('overloads', async () => {
  const result1 = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        address: '0x',
        abi: abi.viewOverloads,
        functionName: 'foo',
      },
    ],
  })
  assertType<[number] | undefined>(result1.data)

  const result2 = useReadContracts({
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
  assertType<[number] | undefined>(result2.data)

  const result3 = useReadContracts({
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
  assertType<[string] | undefined>(result3.data)

  const result4 = useReadContracts({
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
  >(result4.data)
})
