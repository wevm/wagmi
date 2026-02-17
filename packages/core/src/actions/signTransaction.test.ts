import { config, privateKey, signedTransactionRegex } from '@wagmi/test'
import { parseEther } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { beforeEach, expect, test } from 'vitest'
import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { signTransaction } from './signTransaction.js'

const connector = config.connectors[0]!

beforeEach(async () => {
  if (config.state.current === connector.uid)
    await disconnect(config, { connector })
})

test('default', async () => {
  const result = await connect(config, { connector })
  config.state.connections.set(connector.uid, {
    ...result,
    // Switch up the current account because the default one is running out of funds somewhere
    accounts: result.accounts.slice(1) as unknown as typeof result.accounts,
    connector,
  })
  await expect(
    signTransaction(config, {
      to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      value: parseEther('0.0001'),
    }),
  ).resolves.toMatch(signedTransactionRegex)
  await disconnect(config, { connector })
})

test('behavior: connector not connected', async () => {
  await connect(config, { connector })
  await expect(
    signTransaction(config, {
      connector: config.connectors[1],
      to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      value: parseEther('0.0001'),
    }),
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
    [ConnectorNotConnectedError: Connector not connected.

    Version: @wagmi/core@x.y.z]
  `)
  await disconnect(config, { connector })
})

test('behavior: account does not exist on connector', async () => {
  await connect(config, { connector })
  await expect(
    signTransaction(config, {
      account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
      to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      value: parseEther('0.0001'),
    }),
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
    [ConnectorAccountNotFoundError: Account "0xA0Cf798816D4b9b9866b5330EEa46a18382f251e" not found for connector "Mock Connector".

    Version: @wagmi/core@x.y.z]
  `)
  await disconnect(config, { connector })
})

test('behavior: local account', async () => {
  const account = privateKeyToAccount(privateKey)
  await expect(
    signTransaction(config, {
      account,
      to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      type: 'eip1559',
      value: parseEther('0.000001'),
    }),
  ).resolves.toMatch(signedTransactionRegex)
})
