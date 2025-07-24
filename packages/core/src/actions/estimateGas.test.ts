import { accounts, config } from '@wagmi/test'
import { parseEther } from 'viem'
import { expect, test } from 'vitest'

import { mock } from '../connectors/mock.js'
import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { estimateGas } from './estimateGas.js'

const connector = config._internal.connectors.setup(mock({ accounts }))

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
    [ConnectorNotConnectedError: Connector not connected.

    Version: @wagmi/core@x.y.z]
  `)
})
