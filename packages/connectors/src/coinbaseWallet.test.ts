import { expect, test } from 'vitest'

import { config } from '../test/index.js'
import { coinbaseWallet } from './coinbaseWallet.js'

test('setup', () => {
  const connectorFn = coinbaseWallet({ appName: 'wagmi' })
  const connector = config._internal.setup(connectorFn)
  expect(connector.name).toEqual('Coinbase Wallet')
})
