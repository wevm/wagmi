import { config, typedData } from '@wagmi/test'
import { test } from 'vitest'

import { verifyTypedDataQueryOptions } from './verifyTypedData.js'

test('default', async () => {
  verifyTypedDataQueryOptions(config, {
    address: '0x',
    ...typedData.basic,
    primaryType: 'Mail',
    signature: '0x',
  })
  verifyTypedDataQueryOptions(config, {
    address: '0x',
    ...typedData.basic,
    // @ts-expect-error
    primaryType: 'foobarbaz',
    signature: '0x',
  })
})
