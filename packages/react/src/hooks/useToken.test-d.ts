import { expectTypeOf, test } from 'vitest'

import { useToken } from './useToken.js'

test('select data', () => {
  const result = useToken({
    query: {
      select(data) {
        return data?.name
      },
    },
  })
  expectTypeOf(result.data).toEqualTypeOf<string | undefined>()
})
