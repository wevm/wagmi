import { config, typedData } from '@wagmi/test'
import { test } from 'vitest'

import { verifyTypedData } from './verifyTypedData.js'

test('default', async () => {
  verifyTypedData(config, {
    ...typedData.basic,
    primaryType: 'Mail',
    address: '0x',
    signature: '0x',
  })
  verifyTypedData(config, {
    ...typedData.basic,
    // @ts-expect-error
    primaryType: 'foobarbaz',
    address: '0x',
    signature: '0x',
  })
})
