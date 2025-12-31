import { config } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'

import { useWalletClient } from './useWalletClient.js'

test('parameters: config', async () => {
  const client = useWalletClient({ config })
  expectTypeOf(client.data?.chain?.id!).toEqualTypeOf<1 | 456 | 10>()

  const client2 = useWalletClient({ config, chainId: 1 })
  expectTypeOf(client2.data?.chain?.id!).toEqualTypeOf<1>()
})
