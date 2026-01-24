import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { gemini } from './gemini.js'

test('setup', () => {
  const connectorFn = gemini()
  const connector = config._internal.connectors.setup(connectorFn)
  expect(connector.name).toEqual('Gemini Wallet')
})

test('setup with parameters', () => {
  const connectorFn = gemini({
    appMetadata: {
      name: 'Test App',
      url: 'https://example.com',
    },
  })
  const connector = config._internal.connectors.setup(connectorFn)
  expect(connector.name).toEqual('Gemini Wallet')
  expect(connector.id).toEqual('gemini')
})
