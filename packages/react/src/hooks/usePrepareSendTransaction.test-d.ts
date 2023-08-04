import { expectTypeOf, test } from 'vitest'

import { usePrepareSendTransaction } from './usePrepareSendTransaction.js'

test('select data', async () => {
  const result = usePrepareSendTransaction({
    select(data) {
      return data.mode
    },
  })
  expectTypeOf(result.data).toEqualTypeOf<'prepared' | undefined>()
})
