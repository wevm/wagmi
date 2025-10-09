import { accounts, config, testClient } from '@wagmi/test'
import { parseEther } from 'viem'
import { expect, test } from 'vitest'

import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { getCallsStatus } from './getCallsStatus.js'
import { sendCalls } from './sendCalls.js'

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
  await testClient.mainnet.mine({ blocks: 1 })
  const { receipts, status } = await getCallsStatus(config, {
    id,
  })

  expect(status).toBe('success')
  expect(
    receipts?.map((x) => ({ ...x, blockHash: undefined })),
  ).toMatchInlineSnapshot(
    `
    [
      {
        "blockHash": undefined,
        "blockNumber": 23535881n,
        "gasUsed": 21160n,
        "logs": [],
        "status": "success",
        "transactionHash": "0x7add018cb41f4b86d793758248d20cb8394364d9379d201cb7747db29c4aac18",
      },
      {
        "blockHash": undefined,
        "blockNumber": 23535881n,
        "gasUsed": 21000n,
        "logs": [],
        "status": "success",
        "transactionHash": "0x5019ef03b9ee83c6398d1a68490b56878300c1f83697c3b3eeaf666baf63abff",
      },
      {
        "blockHash": undefined,
        "blockNumber": 23535881n,
        "gasUsed": 21000n,
        "logs": [],
        "status": "success",
        "transactionHash": "0xe61204827da836e4bc51fbfe15f04e5b1307c50f160d1add15675c8654663f20",
      },
    ]
  `,
  )
  await disconnect(config, { connector })
})
