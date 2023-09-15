import { abi, config } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'

import { readContractsQueryOptions } from './readContracts.js'

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
