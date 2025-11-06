import { config } from '@wagmi/test'
import { expect, expectTypeOf, test } from 'vitest'

import { coinbaseWallet } from './coinbaseWallet.js'

test('setup', () => {
  const connectorFn = coinbaseWallet({ appName: 'wagmi' })
  const connector = config._internal.connectors.setup(connectorFn)
  expect(connector.name).toEqual('Coinbase Wallet')

  type ConnectFnParameters = NonNullable<
    Parameters<(typeof connector)['connect']>[0]
  >
  expectTypeOf<ConnectFnParameters['instantOnboarding']>().toMatchTypeOf<
    boolean | undefined
  >()
})
