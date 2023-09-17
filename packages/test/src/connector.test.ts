import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { testConnector } from './connector.js'
import { accounts } from './constants.js'

test('setup', () => {
  const connectorFn = testConnector({ accounts })
  const connector = config._internal.connectors.setup(connectorFn)
  expect(connector.name).toEqual('Test Connector')
})
