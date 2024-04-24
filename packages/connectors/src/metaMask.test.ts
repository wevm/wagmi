import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { metaMask } from './metaMask.js'

test('setup', () => {
  const connectorFn = metaMask({
    dappMetadata: {
      name: 'Wagmi App',
    },
  })
  const connector = config._internal.connectors.setup(connectorFn)
  expect(connector.name).toEqual('MetaMask')
})
