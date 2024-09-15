import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { uxuyWallet } from './uxuyWallet.js'

test('setup', () => {
  const connectorFn = uxuyWallet({ appName: 'wagmi' })
  const connector = config._internal.connectors.setup(connectorFn)
  expect(connector.name).toEqual('Uxuy Wallet')
})
