import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { watchAsset } from './watchAsset.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })
  await expect(
    watchAsset(config, {
      type: 'ERC20',
      options: {
        address: '0x0000000000000000000000000000000000000000',
        symbol: 'NULL',
        decimals: 18,
      },
    }),
  ).resolves.toMatchInlineSnapshot('true')
  await disconnect(config, { connector })
})
