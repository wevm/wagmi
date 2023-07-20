import { config, typedData } from '@wagmi/test'
import { test } from 'vitest'

import { signTypedData } from './signTypedData.js'

test('default', async () => {
  signTypedData(config, {
    types: typedData.basic.types,
    primaryType: 'Mail',
    message: typedData.basic.message,
  })
})

test('domain', async () => {
  signTypedData(config, {
    primaryType: 'EIP712Domain',
    domain: {},
  })
})

test('custom domain', async () => {
  signTypedData(config, {
    types: {
      EIP712Domain: [{ type: 'uint256', name: 'chainId' }],
    },
    primaryType: 'EIP712Domain',
    domain: {
      chainId: 123n,
    },
  })
})
