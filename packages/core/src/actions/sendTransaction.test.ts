import { config, transactionHashRegex } from '@wagmi/test'
import { parseEther } from 'viem'
import { expect, test } from 'vitest'

import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { sendTransaction } from './sendTransaction.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })
  await expect(
    sendTransaction(config, {
      to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      value: parseEther('0.01'),
    }),
  ).resolves.toMatch(transactionHashRegex)
  await disconnect(config, { connector })
})
