import { accounts, config } from '@wagmi/test'
import { parseEther } from 'viem'
import { expect, test } from 'vitest'

import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
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
    `
    {
      "id": "0xb24b52a86aa2b0bae6f1e44868c3a13d2572e766a1f6364afd93d1757839b8a1",
    }
  `,
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

test('behavior: nullish account (account filled by wallet)', async () => {
  await expect(
    sendCalls(config, {
      account: null,
      connector,
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
  ).resolves.toMatchInlineSnapshot(
    `
    {
      "id": "0x0a8b20024fae14dd9e854accfc8496b9d18c291206647c842a96a954133401f3",
    }
  `,
  )
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
