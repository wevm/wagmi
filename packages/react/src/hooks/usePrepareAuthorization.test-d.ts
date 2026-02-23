import type { PrepareAuthorizationReturnType } from '@wagmi/core'
import { address } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'

import { usePrepareAuthorization } from './usePrepareAuthorization.js'

test('select data', () => {
  const result = usePrepareAuthorization({
    contractAddress: address.wagmiMintExample,
    query: {
      select(data) {
        expectTypeOf(data).toMatchTypeOf<PrepareAuthorizationReturnType>()
        return data
      },
    },
  })

  expectTypeOf(result.data).toMatchTypeOf<
    PrepareAuthorizationReturnType | undefined
  >()
})
