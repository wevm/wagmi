import { abi, config } from '@wagmi/test'
import type { Log } from 'viem'
import { expectTypeOf, test } from 'vitest'

import { simulateBlocks } from './simulateBlocks.js'

test('default', async () => {
  const response = await simulateBlocks(config, {
    blocks: [
      {
        calls: [
          {
            to: '0x',
            abi: abi.erc20,
            functionName: 'balanceOf',
            args: ['0x'],
          },
        ],
      },
    ],
  })

  expectTypeOf(response[0]!.calls).toMatchTypeOf<
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
