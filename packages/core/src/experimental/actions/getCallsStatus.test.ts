import { accounts, config, testClient } from '@wagmi/test'
import { parseEther } from 'viem'
import { expect, test } from 'vitest'

import { connect } from '../../actions/connect.js'
import { disconnect } from '../../actions/disconnect.js'
import { getCallsStatus } from './getCallsStatus.js'
import { sendCalls } from './sendCalls.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })
  const id = await sendCalls(config, {
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

  expect(status).toBe('CONFIRMED')
  expect(
    receipts?.map((x) => ({ ...x, blockHash: undefined })),
  ).toMatchInlineSnapshot(
    `
    [
      {
        "blockHash": undefined,
        "blockNumber": 19258214n,
        "gasUsed": 21064n,
        "logs": [],
        "status": "success",
        "transactionHash": "0xa81a893ca5596aa105fc10206b9a8bd63df8bd526d8c0594496330f956515b4b",
      },
      {
        "blockHash": undefined,
        "blockNumber": 19258214n,
        "gasUsed": 21000n,
        "logs": [],
        "status": "success",
        "transactionHash": "0x63624bbfc73f8bd7629ecb4e00ba521a9967ea9e9098ac17ae5bf500c904da1a",
      },
      {
        "blockHash": undefined,
        "blockNumber": 19258214n,
        "gasUsed": 21000n,
        "logs": [],
        "status": "success",
        "transactionHash": "0xc3df1b2f2c76723846a964c0c4d6d11ba423df036e0e636d298416e0f94bda29",
      },
    ]
  `,
  )
  await disconnect(config, { connector })
})
