import { type TransactionReceipt } from 'viem'
import { expectTypeOf, test } from 'vitest'

import { useTransactionReceipt } from './useTransactionReceipt.js'

test('select data', async () => {
  const result = useTransactionReceipt({
    query: {
      select(data) {
        return data
      },
    },
  })
  expectTypeOf(result.data).toEqualTypeOf<TransactionReceipt | undefined>()
})
