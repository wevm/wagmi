import { type CallReturnType } from 'viem'
import { expectTypeOf, test } from 'vitest'
import { useCall } from './useCall.js'

test('select data', async () => {
  const result = useCall({
    query: {
      select(data) {
        return data
      },
    },
  })
  expectTypeOf(result.data).toEqualTypeOf<CallReturnType | undefined>()
})
