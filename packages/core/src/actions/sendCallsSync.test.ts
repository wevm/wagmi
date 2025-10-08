import { accounts, config, testClient, wait } from '@wagmi/test'
import { parseEther } from 'viem'
import { expect, test } from 'vitest'

import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { sendCallsSync } from './sendCallsSync.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })
  const [status] = await Promise.all([
    sendCallsSync(config, {
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
    (async () => {
      await wait(1000)
      await testClient.mainnet.mine({ blocks: 1 })
    })(),
  ])
  expect(status).toBeDefined()
  await disconnect(config, { connector })
})

test('behavior: not connected', async () => {
  await expect(
    sendCallsSync(config, {
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
    sendCallsSync(config, {
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
      "id": "0x035b56a56a5b2fea10e194bae4c846b415de48a8288c7eb704ba7880edcc29a0",
    }
  `,
  )
})

test('behavior: account does not exist on connector', async () => {
  await connect(config, { connector })
  await expect(
    sendCallsSync(config, {
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
