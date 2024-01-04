import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { ledger } from './ledger.js'

test('setup', () => {
  const connectorFn = ledger({})
  const connector = config._internal.connectors.setup(connectorFn)
  expect(connector.name).toEqual('Ledger')
})
