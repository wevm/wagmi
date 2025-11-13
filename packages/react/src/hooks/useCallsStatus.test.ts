import { connect, disconnect } from '@wagmi/core'
import { accounts, config, testClient } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import { parseEther } from 'viem'
import { expect, test, vi } from 'vitest'

import { useCallsStatus } from './useCallsStatus.js'
import { useSendCalls } from './useSendCalls.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })

  const { result } = await renderHook(() => useSendCalls())

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
  await vi.waitUntil(() => result.current.isSuccess, { timeout: 5_000 })

  const { result: result_2 } = await renderHook(() =>
    useCallsStatus({ id: result.current.data?.id! }),
  )
  await vi.waitFor(() => expect(result_2.current.isSuccess).toBeTruthy())

  expect(result_2.current.data).toMatchInlineSnapshot(
    `
    {
      "atomic": false,
      "chainId": 1,
      "id": "0xb24b52a86aa2b0bae6f1e44868c3a13d2572e766a1f6364afd93d1757839b8a1",
      "receipts": [],
      "status": "pending",
      "statusCode": 100,
      "version": "2.0.0",
    }
  `,
  )

  await testClient.mainnet.mine({ blocks: 1 })

  const { result: result_3 } = await renderHook(() =>
    useCallsStatus({ id: result.current.data?.id! }),
  )
  await vi.waitFor(() => expect(result_3.current.isSuccess).toBeTruthy())

  expect(result_3.current.data?.status).toBe('success')
  expect(result_3.current.data?.statusCode).toBe(200)
  expect(
    result_3.current.data?.receipts?.map((x) => ({
      ...x,
      blockHash: undefined,
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
