import { type PrepareTransactionRequestReturnType } from 'viem'
import { expectTypeOf, test } from 'vitest'
import { usePrepareTransactionRequest } from './usePrepareTransactionRequest.js'

test('select data', async () => {
  const result = usePrepareTransactionRequest({
    query: {
      select(data) {
        return data
      },
    },
  })
  result.data
  expectTypeOf(result.data).toMatchTypeOf<
    PrepareTransactionRequestReturnType | undefined
  >()
})
