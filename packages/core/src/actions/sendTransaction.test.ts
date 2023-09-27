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

test('behavior: connector not connected', async () => {
  await connect(config, { connector })
  await expect(
    sendTransaction(config, {
      connector: config.connectors[1],
      to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      value: parseEther('0.01'),
    }),
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
    "Connector not connected.

    Version: @wagmi/core@x.y.z"
  `)
  await disconnect(config, { connector })
})

test('behavior: account does not exist on connector', async () => {
  await connect(config, { connector })
  await expect(
    sendTransaction(config, {
      account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
      to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      value: parseEther('0.01'),
    }),
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
    "Account \\"0xA0Cf798816D4b9b9866b5330EEa46a18382f251e\\" not found for connector \\"Mock Connector\\".

    Version: @wagmi/core@x.y.z"
  `)
  await disconnect(config, { connector })
})
