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
        "blockNumber": 19258222n,
        "gasUsed": 21064n,
        "logs": [],
        "status": "success",
        "transactionHash": "0xe170f3830536bf30afc3db8e387fc5b2c32c04775cb7ec0fa144ec398d464c7c",
      },
      {
        "blockHash": undefined,
        "blockNumber": 19258222n,
        "gasUsed": 42064n,
        "logs": [],
        "status": "success",
        "transactionHash": "0xf1ea1c5422b1c2fc42fa8e5b50cc1023696de2a10cdefd311c9b2e4d30bb8a6a",
      },
      {
        "blockHash": undefined,
        "blockNumber": 19258222n,
        "gasUsed": 63064n,
        "logs": [],
        "status": "success",
        "transactionHash": "0xd6bee0fa50e87adf00d0d3d0727aa27914aa3ca13765a108d04794f960b39289",
      },
    ]
  `,
  )
  await disconnect(config, { connector })
})
