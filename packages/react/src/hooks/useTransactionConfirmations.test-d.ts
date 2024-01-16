import { expectTypeOf, test } from 'vitest'

import { useTransactionConfirmations } from './useTransactionConfirmations.js'

test('select data', () => {
  const result = useTransactionConfirmations({
    query: {
      select(data) {
        return data
      },
    },
  })
  expectTypeOf(result.data).toEqualTypeOf<bigint | undefined>()
})
