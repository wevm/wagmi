import { expectTypeOf, test } from 'vitest'

import { useTransaction } from './useTransaction.js'

test('select data', () => {
  const result = useTransaction({
    query: {
      select(data) {
        return data?.nonce
      },
    },
  })
  expectTypeOf(result.data.value).toEqualTypeOf<number | undefined>()
})
