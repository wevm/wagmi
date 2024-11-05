import { abi, address, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { connect } from '../../actions/connect.js'
import { disconnect } from '../../actions/disconnect.js'
import { writeContracts } from './writeContracts.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })
  await expect(
    writeContracts(config, {
      contracts: [
        {
          abi: abi.wagmiMintExample,
          address: address.wagmiMintExample,
          functionName: 'mint',
        },
        {
          abi: abi.wagmiMintExample,
          address: address.wagmiMintExample,
          functionName: 'mint',
        },
        {
          abi: abi.wagmiMintExample,
          address: address.wagmiMintExample,
          functionName: 'mint',
        },
      ],
    }),
  ).resolves.toMatchInlineSnapshot(
    `"0x1872d9f0ee275f586d93d23dbd683d8b6fd9a97ba8918a817c9f4b6fc3b85cf7"`,
  )
  await disconnect(config, { connector })
})

test('behavior: not connected', async () => {
  await expect(
    writeContracts(config, {
      contracts: [
        {
          abi: abi.wagmiMintExample,
          address: address.wagmiMintExample,
          functionName: 'mint',
        },
        {
          abi: abi.wagmiMintExample,
          address: address.wagmiMintExample,
          functionName: 'mint',
        },
        {
          abi: abi.wagmiMintExample,
          address: address.wagmiMintExample,
          functionName: 'mint',
        },
      ],
    }),
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
    [ConnectorNotConnectedError: Connector not connected.

    Version: @wagmi/core@x.y.z]
  `)
})

test('behavior: account does not exist on connector', async () => {
  await connect(config, { connector })
  await expect(
    writeContracts(config, {
      account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
      contracts: [
        {
          abi: abi.wagmiMintExample,
          address: address.wagmiMintExample,
          functionName: 'mint',
        },
        {
          abi: abi.wagmiMintExample,
          address: address.wagmiMintExample,
          functionName: 'mint',
        },
        {
          abi: abi.wagmiMintExample,
          address: address.wagmiMintExample,
          functionName: 'mint',
        },
      ],
    }),
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
    [ConnectorAccountNotFoundError: Account "0xA0Cf798816D4b9b9866b5330EEa46a18382f251e" not found for connector "Mock Connector".

    Version: @wagmi/core@x.y.z]
  `)
  await disconnect(config, { connector })
})
