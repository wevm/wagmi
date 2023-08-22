import { expectTypeOf, test } from 'vitest'

import { useWaitForTransactionReceipt } from './useWaitForTransactionReceipt.js'

test('select data', async () => {
  const result = useWaitForTransactionReceipt({
    select(data) {
      return data?.blockNumber
    },
  })
  expectTypeOf(result.data).toEqualTypeOf<bigint | undefined>()
})
