import { accounts, config } from '@wagmi/test'
import { parseEther } from 'viem'
import { expect, test } from 'vitest'

import { connect } from '../../actions/connect.js'
import { disconnect } from '../../actions/disconnect.js'
import { sendCalls } from './sendCalls.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })
  await expect(
    sendCalls(config, {
      calls: [
        {
          data: '0xdeadbeef',
          to: accounts[1],
          value: parseEther('1'),
        },
        {
          to: accounts[2],
          value: parseEther('2'),
        },
        {
          to: accounts[3],
          value: parseEther('3'),
        },
      ],
    }),
  ).resolves.toMatchInlineSnapshot(
    `"0x943e879b78e26f9e960a0c682e53d153a75487ef24624a44dbf22ae439b3d370"`,
  )
  await disconnect(config, { connector })
})

test('behavior: not connected', async () => {
  await expect(
    sendCalls(config, {
      calls: [
        {
          to: accounts[1],
          value: parseEther('1'),
        },
        {
          to: accounts[2],
          value: parseEther('2'),
        },
        {
          to: accounts[3],
          value: parseEther('3'),
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
    sendCalls(config, {
      account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
      calls: [
        {
          to: accounts[1],
          value: parseEther('1'),
        },
        {
          to: accounts[2],
          value: parseEther('2'),
        },
        {
          to: accounts[3],
          value: parseEther('3'),
        },
      ],
    }),
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
    [ConnectorAccountNotFoundError: Account "0xA0Cf798816D4b9b9866b5330EEa46a18382f251e" not found for connector "Mock Connector".

    Version: @wagmi/core@x.y.z]
  `)
  await disconnect(config, { connector })
})
