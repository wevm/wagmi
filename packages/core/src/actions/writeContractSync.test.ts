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
  await connect(config, { connector })
  const [receipt] = await Promise.all([
    writeContractSync(config, {
      abi: abi.wagmiMintExample,
      address: address.wagmiMintExample,
      functionName: 'mint',
    }),
    (async () => {
      await wait(3000)
      await testClient.mainnet.mine({ blocks: 1 })
    })(),
  ])
  expect(receipt).toBeDefined()
  expect(receipt.status).toBe('success')
  expect(receipt.blockNumber).toBeDefined()
  await disconnect(config, { connector })
})

test('behavior: connector not connected', async () => {
  await connect(config, { connector })
  await expect(
    writeContractSync(config, {
      connector: config.connectors[1],
      abi: abi.wagmiMintExample,
      address: address.wagmiMintExample,
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
      abi: abi.wagmiMintExample,
      address: address.wagmiMintExample,
      functionName: 'mint',
    }),
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
    [ConnectorAccountNotFoundError: Account "0xA0Cf798816D4b9b9866b5330EEa46a18382f251e" not found for connector "Mock Connector".

    Version: @wagmi/core@x.y.z]
  `)
  await disconnect(config, { connector })
})
