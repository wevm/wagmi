import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { porto } from './porto.js'

test('setup', () => {
  const connectorFn = porto()
  const connector = config._internal.connectors.setup(connectorFn)
  expect(connector.name).toEqual('Porto')
})
