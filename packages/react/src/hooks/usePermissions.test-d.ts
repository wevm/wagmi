import { expectTypeOf, test } from 'vitest'

import { usePermissions } from './usePermissions.js'
import type { WalletPermission } from 'viem'

test('select data', () => {
  const result = usePermissions({
    query: {
      select(data) {
        return data
      },
    },
  })
  expectTypeOf(result.data).toEqualTypeOf<WalletPermission[] | undefined>()
})
