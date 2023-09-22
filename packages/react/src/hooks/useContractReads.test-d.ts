import { abi } from '@wagmi/test'
import { assertType, expectTypeOf, test } from 'vitest'

import { useContractReads } from './useContractReads.js'

test('select data', async () => {
  const result = useContractReads({
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
  const result1 = useContractReads({
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

  const result2 = useContractReads({
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

  const result3 = useContractReads({
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

  const result4 = useContractReads({
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
