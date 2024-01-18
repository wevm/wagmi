import { expectTypeOf, test } from 'vitest'

import { useTransactionReceipt } from './useTransactionReceipt.js'

test('select data', () => {
  const result = useTransactionReceipt({
    query: {
      select(data) {
        return data?.blockNumber
      },
    },
  })
  expectTypeOf(result.data).toEqualTypeOf<bigint | undefined>()
})
