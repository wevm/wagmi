import { config } from '@wagmi/test'
import { parseEther } from 'viem'
import { expect, test } from 'vitest'

import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { prepareSendTransaction } from './prepareSendTransaction.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })
  await expect(
    prepareSendTransaction(config, {
      to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      value: parseEther('0.01'),
    }),
  ).resolves.toMatchInlineSnapshot(`
    {
      "chainId": undefined,
      "gas": 21000n,
      "mode": "prepared",
      "to": "0xd2135CfB216b74109775236E36d4b433F1DF507B",
      "value": 10000000000000000n,
    }
  `)
  await disconnect(config, { connector })
})
