import { accounts, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { requestPermissions } from './requestPermissions.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })
  try {
    await expect(
      requestPermissions(config, { eth_accounts: {} }),
    ).resolves.toEqual([
      {
        caveats: [
          {
            type: 'filterResponse',
            value: accounts,
          },
        ],
        invoker: 'https://example.com',
        parentCapability: 'eth_accounts',
      },
    ])
  } finally {
    await disconnect(config, { connector })
  }
})
