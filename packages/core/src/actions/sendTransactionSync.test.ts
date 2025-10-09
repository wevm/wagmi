import { config, testClient, wait } from '@wagmi/test'
import { parseEther } from 'viem'
import { beforeEach, expect, test } from 'vitest'
import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { sendTransactionSync } from './sendTransactionSync.js'

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
  const [receipt] = await Promise.all([
    sendTransactionSync(config, {
      to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      value: parseEther('0.0001'),
    }),
    (async () => {
      await wait(1000)
      await testClient.mainnet.mine({ blocks: 1 })
    })(),
  ])
  expect(receipt).toBeDefined()
  await disconnect(config, { connector })
})

test('behavior: connector not connected', async () => {
  await connect(config, { connector })
  await expect(
    sendTransactionSync(config, {
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
    sendTransactionSync(config, {
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
    sendTransactionSync(config, {
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
      from:   0x95132632579b073D12a6673e18Ab05777a6B86f8
      to:     0xd2135CfB216b74109775236E36d4b433F1DF507B
      value:  99999 ETH

    Details: Insufficient funds for gas * price + value
    Version: viem@2.38.0]
  `)
  await disconnect(config, { connector })
})
