import { config } from '@wagmi/test'
import type { PrepareTransactionRequestReturnType } from 'viem'
import { expectTypeOf, test } from 'vitest'

import { usePrepareTransactionRequest } from './usePrepareTransactionRequest.js'

test('select data', () => {
  const result = usePrepareTransactionRequest({
    query: {
      select(data) {
        return data
      },
    },
  })

  expectTypeOf(result.data).toMatchTypeOf<
    PrepareTransactionRequestReturnType | undefined
  >()
})

test('parameters: config', () => {
  const result = usePrepareTransactionRequest({
    config,
    chainId: 456,
  })
  if (result.data) expectTypeOf(result.data.chainId).toEqualTypeOf<456>()
})
