import { abi } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'

import { useSimulateBlocks } from './useSimulateBlocks.js'

test('select data', () => {
  const result = useSimulateBlocks({
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
    query: {
      select(data) {
        expectTypeOf(data[0]!.calls[0]).toMatchTypeOf<
          | { status: 'success'; result: bigint }
          | { status: 'failure'; error: Error }
        >()
        return data[0]!.calls
      },
    },
  })

  expectTypeOf(result.data.value).toMatchTypeOf<
    | readonly (
        | { status: 'success'; result: bigint }
        | { status: 'failure'; error: Error }
      )[]
    | undefined
  >()
})
