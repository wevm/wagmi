import { abi, config } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'

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
