import { abi, address, config, testClient, wait } from '@wagmi/test'
import { beforeEach, expect, test } from 'vitest'
import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { writeContractSync } from './writeContractSync.js'

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
    writeContractSync(config, {
      address: address.wagmiMintExample,
      abi: abi.wagmiMintExample,
      functionName: 'mint',
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
    writeContractSync(config, {
      connector: config.connectors[1],
      address: address.wagmiMintExample,
      abi: abi.wagmiMintExample,
      functionName: 'mint',
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
    writeContractSync(config, {
      account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
      address: address.wagmiMintExample,
      abi: abi.wagmiMintExample,
      functionName: 'mint',
    }),
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
    [ConnectorAccountNotFoundError: Account "0xA0Cf798816D4b9b9866b5330EEa46a18382f251e" not found for connector "Mock Connector".

    Version: @wagmi/core@x.y.z]
  `)
  await disconnect(config, { connector })
})
