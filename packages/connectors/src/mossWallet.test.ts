import { createConfig, http } from '@wagmi/core'
import { megaeth } from 'viem/chains'
import { expect, test } from 'vitest'

import { mossWallet } from './mossWallet.js'

test('setup', () => {
  const config = createConfig({
    chains: [megaeth],
    connectors: [mossWallet()],
    transports: { [megaeth.id]: http() },
  })

  const connector = config.connectors[0]
  expect(connector?.name).toEqual('MOSS Wallet')
  expect(connector?.rdns).toEqual('com.megaeth.account')
})
