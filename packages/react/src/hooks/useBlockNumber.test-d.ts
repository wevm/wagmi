import { expectTypeOf, test } from 'vitest'

import { useBlockNumber } from './useBlockNumber.js'

test('select data', async () => {
  const result = useBlockNumber({
    select(data) {
      return data?.toString()
    },
  })
  expectTypeOf(result.data).toEqualTypeOf<string | undefined>()
})
