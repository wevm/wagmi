import { expectTypeOf, test } from 'vitest'

import { useBlobBaseFee } from './useBlobBaseFee.js'

test('select data', () => {
  const result = useBlobBaseFee({
    query: {
      select(data) {
        return data?.toString()
      },
    },
  })
  expectTypeOf(result.data).toEqualTypeOf<string | undefined>()
})
