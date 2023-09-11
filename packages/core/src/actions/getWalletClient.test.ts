import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { getWalletClient } from './getWalletClient.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })
  await expect(getWalletClient(config)).resolves.toBeDefined()
  await disconnect(config, { connector })
})

test('behavior: not connected', async () => {
  await expect(
    getWalletClient(config),
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
    "Connector not connected.

    Version: @wagmi/core@x.y.z"
  `)
})
