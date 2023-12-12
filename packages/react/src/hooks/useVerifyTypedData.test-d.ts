import { expectTypeOf, test } from 'vitest'

import { useVerifyTypedData } from './useVerifyTypedData.js'

test('select data', async () => {
  const result = useVerifyTypedData({
    query: {
      select(data) {
        return data
      },
    },
  })
  expectTypeOf(result.data).toEqualTypeOf<boolean | undefined>()
})
