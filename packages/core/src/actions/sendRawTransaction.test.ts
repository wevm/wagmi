import { config, transactionHashRegex } from '@wagmi/test'
import { parseEther } from 'viem'
import { beforeEach, expect, test } from 'vitest'

import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { sendRawTransaction } from './sendRawTransaction.js'
import { signTransaction } from './signTransaction.js'

const connector = config.connectors[0]!

beforeEach(async () => {
  if (config.state.current === connector.uid)
    await disconnect(config, { connector })
})

test('default', async () => {
  await connect(config, { connector })
  const serializedTransaction = await signTransaction(config, {
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    value: parseEther('0.01'),
  })

  expect(
    sendRawTransaction(config, {
      serializedTransaction,
    }),
  ).resolves.toMatch(transactionHashRegex)
})

test('behavior: connector not connected', async () => {
  await connect(config, { connector })

  const serializedTransaction = await signTransaction(config, {
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    value: parseEther('0.01'),
  })

  await expect(
    sendRawTransaction(config, {
      connector: config.connectors[1],
      serializedTransaction,
    }),
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
    [ConnectorNotConnectedError: Connector not connected.

    Version: @wagmi/core@x.y.z]
  `)
  await disconnect(config, { connector })
})
