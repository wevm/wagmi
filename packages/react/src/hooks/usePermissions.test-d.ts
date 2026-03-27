import type { WalletPermission } from 'viem'
import { expectTypeOf, test } from 'vitest'
import { usePermissions } from './usePermissions.js'

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
