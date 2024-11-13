import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { createThirdwebClient } from 'thirdweb'
import { inAppWallet } from './thirdweb.js'

/**
 * To manually test this connector:
 * 1. get a clientId from https://thirdweb.com
 * 3. add this connector to the playground
 */
test('setup', () => {
  const connectorFn = inAppWallet({
    client: createThirdwebClient({ clientId: 'testClientId' }),
    strategy: 'google',
  })
  const connector = config._internal.connectors.setup(connectorFn)
  expect(connector.name).toEqual('In-App wallet')
})
