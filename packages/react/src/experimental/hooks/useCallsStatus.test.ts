import { connect, disconnect } from '@wagmi/core'
import { accounts, config, testClient } from '@wagmi/test'
import { renderHook, waitFor } from '@wagmi/test/react'
import { parseEther } from 'viem'
import { expect, test } from 'vitest'

import { useCallsStatus } from './useCallsStatus.js'
import { useSendCalls } from './useSendCalls.js'

const connector = config.connectors[0]!

test.skip('default', async () => {
  await connect(config, { connector })

  const { result } = renderHook(() => useSendCalls())

  result.current.sendCalls({
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
  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  const { result: result_2 } = renderHook(() =>
    useCallsStatus({ id: result.current.data! }),
  )
  await waitFor(() => expect(result_2.current.isSuccess).toBeTruthy())

  expect(result_2.current.data).toMatchInlineSnapshot(
    `
    {
      "receipts": [],
      "status": "PENDING",
    }
  `,
  )

  await testClient.mainnet.mine({ blocks: 1 })

  const { result: result_3 } = renderHook(() =>
    useCallsStatus({ id: result.current.data! }),
  )
  await waitFor(() => expect(result_3.current.isSuccess).toBeTruthy())

  expect(result_3.current.data).toMatchInlineSnapshot(
    `
    {
      "receipts": [
        {
          "blockHash": "0x759f30616acde00a66d2bd83cc0bd011662ff0ca945d599554818fa0f9fdd0d2",
          "blockNumber": 19258214n,
          "gasUsed": 21064n,
          "logs": [],
          "status": "success",
          "transactionHash": "0xa81a893ca5596aa105fc10206b9a8bd63df8bd526d8c0594496330f956515b4b",
        },
        {
          "blockHash": "0x759f30616acde00a66d2bd83cc0bd011662ff0ca945d599554818fa0f9fdd0d2",
          "blockNumber": 19258214n,
          "gasUsed": 21000n,
          "logs": [],
          "status": "success",
          "transactionHash": "0x63624bbfc73f8bd7629ecb4e00ba521a9967ea9e9098ac17ae5bf500c904da1a",
        },
        {
          "blockHash": "0x759f30616acde00a66d2bd83cc0bd011662ff0ca945d599554818fa0f9fdd0d2",
          "blockNumber": 19258214n,
          "gasUsed": 21000n,
          "logs": [],
          "status": "success",
          "transactionHash": "0xc3df1b2f2c76723846a964c0c4d6d11ba423df036e0e636d298416e0f94bda29",
        },
      ],
      "status": "CONFIRMED",
    }
  `,
  )

  await disconnect(config, { connector })
})
