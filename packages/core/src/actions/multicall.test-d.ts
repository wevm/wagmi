import { abi, config } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'

import { multicall } from './multicall.js'

test('default', async () => {
  const result = await multicall(config, {
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
        | { error: Error; status: 'failure' }
        | { result: bigint; status: 'success' }
      ),
      (
        | { error: Error; status: 'failure' }
        | { result: string; status: 'success' }
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
