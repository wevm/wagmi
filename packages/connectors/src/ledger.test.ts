import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { ledger } from './ledger.js'

test('setup', () => {
  const connectorFn = ledger()
  const connector = config._internal.connectors.setup(connectorFn)
  expect(connector.name).toEqual('Ledger')
})

test('setup with parameters', () => {
  const connectorFn = ledger({
    debug: true,
    derivationPath: "44'/60'/0'/0/1",
  })
  const connector = config._internal.connectors.setup(connectorFn)
  expect(connector.name).toEqual('Ledger')
})
