import { config, privateKey } from '@wagmi/test'
import { parseEther, type TransactionRequestBase } from 'viem'
import { beforeEach, expect, test } from 'vitest'

import { privateKeyToAccount } from 'viem/accounts'
import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { signTransaction } from './signTransaction.js'

const connector = config.connectors[0]!

const base = {
  from: '0x0000000000000000000000000000000000000000',
  gas: 21000n,
  nonce: 785,
} satisfies TransactionRequestBase

beforeEach(async () => {
  if (config.state.current === connector.uid)
    await disconnect(config, { connector })
})

test('default', async () => {
  await connect(config, { connector })
  await expect(
    signTransaction(config, {
      // ...base,
      to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      value: parseEther('0.01'),
    }),
  ).resolves.toMatchInlineSnapshot(
    '"0x02f870018203118085065e22cad982520894d2135cfb216b74109775236e36d4b433f1df507b872386f26fc1000080c080a0af0d6c8691aae5ecfe11b40f69ea580980175ce3a242b431f65c6192c5f59663a0016d0a36a9b3100da6a45d818a4261d64ad5276d07f6313e816777705e619b91"',
  )
  await disconnect(config, { connector })
})

test('behavior: connector not connected', async () => {
  await connect(config, { connector })
  await expect(
    signTransaction(config, {
      ...base,
      connector: config.connectors[1],
      to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      value: parseEther('0.01'),
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
      ...base,
      account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
      to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      value: parseEther('0.01'),
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
      ...base,
      account,
      type: 'eip1559',
      to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      value: parseEther('0.01'),
    }),
  ).resolves.toMatchInlineSnapshot(
    '"0x02f8690182031180808094d2135cfb216b74109775236e36d4b433f1df507b872386f26fc1000080c001a05df802f592b42ca82e8e9fb9ef0a923ef4d090234fd80dd83d980c09948ab5dea03b845f9d0602a1a11fb319f68d77d658d471c6661733179094bd313a4c1b61aa"',
  )
})
