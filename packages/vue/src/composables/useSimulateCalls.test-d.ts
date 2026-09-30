import { abi } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'
import { ref } from 'vue'

import { useSimulateCalls } from './useSimulateCalls.js'

test('select data', () => {
  const result = useSimulateCalls({
    calls: [
      {
        to: '0x',
        abi: abi.erc20,
        functionName: 'balanceOf',
        args: ['0x'],
      },
    ],
    query: {
      select(data) {
        expectTypeOf(data.results[0]).toMatchTypeOf<
          | { status: 'success'; result: bigint }
          | { status: 'failure'; error: Error }
        >()
        return data.results
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

test('reactive parameters', () => {
  useSimulateCalls({
    calls: ref([
      {
        data: '0x' as const,
        to: '0x' as const,
      },
    ]),
  })
})
