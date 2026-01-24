import { address, config, privateKey } from '@wagmi/test'
import { privateKeyToAccount } from 'viem/accounts'
import { expectTypeOf, test } from 'vitest'

import { prepareAuthorization } from './prepareAuthorization.js'

const account = privateKeyToAccount(privateKey)

test('default', async () => {
  const result = await prepareAuthorization(config, {
    account,
    contractAddress: address.wagmiMintExample,
    chainId: 1,
    nonce: 0,
  })

  expectTypeOf(result.chainId).toEqualTypeOf<number>()
  expectTypeOf(result.address).toEqualTypeOf<`0x${string}`>()
})
