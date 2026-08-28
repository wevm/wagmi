import { abi, config } from '@wagmi/test'
import type { Log } from 'viem'
import { expectTypeOf, test } from 'vitest'

import { simulateCalls } from './simulateCalls.js'

test('default', async () => {
  const response = await simulateCalls(config, {
    calls: [
      {
        to: '0x',
        abi: abi.erc20,
        functionName: 'balanceOf',
        args: ['0x'],
      },
    ],
  })

  expectTypeOf(response.results).toMatchTypeOf<
    readonly [
      | {
          status: 'success'
          result: bigint
          data: `0x${string}`
          gasUsed: bigint
          logs?: Log[] | undefined
        }
      | {
          status: 'failure'
          error: Error
          data: `0x${string}`
          gasUsed: bigint
          logs?: Log[] | undefined
        },
    ]
  >()
})
