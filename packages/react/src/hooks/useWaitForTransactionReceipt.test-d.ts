import { expectTypeOf, test } from 'vitest'

import { useWaitForTransactionReceipt } from './useWaitForTransactionReceipt.js'

test('select data', () => {
  const result = useWaitForTransactionReceipt({
    query: {
      select(data) {
        return data?.blockNumber
      },
    },
  })
  expectTypeOf(result.data).toEqualTypeOf<bigint | undefined>()
})
