import { config, privateKey, transactionHashRegex } from '@wagmi/test'
import { parseEther } from 'viem'
import { beforeEach, expect, test } from 'vitest'

import { privateKeyToAccount } from 'viem/accounts'
import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { sendTransaction } from './sendTransaction.js'

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
    sendTransaction(config, {
      to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      value: parseEther('0.0001'),
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
    sendTransaction(config, {
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

test('behavior: value exceeds balance', async () => {
  await connect(config, { connector })
  await expect(
    sendTransaction(config, {
      to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      value: parseEther('99999'),
    }),
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
    [TransactionExecutionError: The total cost (gas * gas fee + value) of executing this transaction exceeds the balance of the account.

    This error could arise when the account does not have enough funds to:
     - pay for the total gas fee,
     - pay for the value to send.
     
    The cost of the transaction is calculated as \`gas * gas fee + value\`, where:
     - \`gas\` is the amount of gas needed for transaction to execute,
     - \`gas fee\` is the gas fee,
     - \`value\` is the amount of ether to send to the recipient.
     
    Request Arguments:
      from:   0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
      to:     0xd2135CfB216b74109775236E36d4b433F1DF507B
      value:  99999 ETH

    Details: Insufficient funds for gas * price + value
    Version: viem@2.23.12]
  `)
  await disconnect(config, { connector })
})

test('behavior: local account', async () => {
  const account = privateKeyToAccount(privateKey)
  await expect(
    sendTransaction(config, {
      account,
      to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      value: parseEther('0.000001'),
    }),
  ).resolves.toMatch(transactionHashRegex)
})
