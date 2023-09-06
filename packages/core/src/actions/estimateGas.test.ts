import { accounts, config, testConnector } from '@wagmi/test'
import { parseEther } from 'viem'
import { expect, test } from 'vitest'

import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { estimateGas } from './estimateGas.js'

const connector = config._internal.setup(testConnector({ accounts }))

test('parameters: account', async () => {
  await expect(
    estimateGas(config, {
      account: accounts[0],
      to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      value: parseEther('0.01'),
    }),
  ).resolves.toMatchInlineSnapshot('21000n')
})

test('parameters: connector', async () => {
  await connect(config, { connector })

  await expect(
    estimateGas(config, {
      connector,
      to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      value: parseEther('0.01'),
    }),
  ).resolves.toMatchInlineSnapshot('21000n')

  await disconnect(config, { connector })
})

test('behavior: no account and not connected', async () => {
  await expect(
    estimateGas(config, {
      to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      value: parseEther('0.01'),
    }),
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
    "Connector not found.

    Version: @wagmi/core@x.y.z"
  `)
})
