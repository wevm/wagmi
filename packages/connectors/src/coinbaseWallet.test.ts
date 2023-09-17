import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { coinbaseWallet } from './coinbaseWallet.js'

test('setup', () => {
  const connectorFn = coinbaseWallet({ appName: 'wagmi' })
  const connector = config._internal.connectors.setup(connectorFn)
  expect(connector.name).toEqual('Coinbase Wallet')
})
