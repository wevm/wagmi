import { expectTypeOf, test } from 'vitest'

import { useVerifyMessage } from './useVerifyMessage.js'

test('select data', async () => {
  const result = useVerifyMessage({
    query: {
      select(data) {
        return data
      },
    },
  })
  expectTypeOf(result.data).toEqualTypeOf<boolean | undefined>()
})
