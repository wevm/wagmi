import { expectTypeOf, test } from 'vitest'

import { useFeeHistory } from './useFeeHistory.js'

test('select data', () => {
  const result = useFeeHistory({
    query: {
      select(data) {
        return data.gasUsedRatio
      },
    },
  })
  expectTypeOf(result.data).toEqualTypeOf<number[] | undefined>()
})
