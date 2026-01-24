import { accounts, config, testClient, wait } from '@wagmi/test'
import { parseEther } from 'viem'
import { expect, test } from 'vitest'

import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { sendCalls } from './sendCalls.js'
import { waitForCallsStatus } from './waitForCallsStatus.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })

  const { id } = await sendCalls(config, {
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
  })

  const [{ receipts, status }] = await Promise.all([
    waitForCallsStatus(config, {
      id,
    }),
    (async () => {
      await wait(100)
      await testClient.mainnet.mine({ blocks: 1 })
    })(),
  ])

  expect(status).toBe('success')
  expect(
    receipts?.map((x) => ({
      ...x,
      blockHash: undefined,
      transactionHash: undefined,
    })),
  ).toMatchInlineSnapshot(
    `
    [
      {
        "blockHash": undefined,
        "blockNumber": 23535881n,
        "gasUsed": 21160n,
        "logs": [],
        "status": "success",
        "transactionHash": undefined,
      },
      {
        "blockHash": undefined,
        "blockNumber": 23535881n,
        "gasUsed": 21000n,
        "logs": [],
        "status": "success",
        "transactionHash": undefined,
      },
      {
        "blockHash": undefined,
        "blockNumber": 23535881n,
        "gasUsed": 21000n,
        "logs": [],
        "status": "success",
        "transactionHash": undefined,
      },
    ]
  `,
  )
  await disconnect(config, { connector })
})
