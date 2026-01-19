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

  result.current.mutate({
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
  await vi.waitFor(() => expect(result_2.current.isSuccess).toBeTruthy(), {
    timeout: 5_000,
  })

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
  await vi.waitFor(() => expect(result_3.current.isSuccess).toBeTruthy(), {
    timeout: 5_000,
  })

  expect(result_3.current.data?.status).toBe('success')
  expect(result_3.current.data?.statusCode).toBe(200)
  expect(
    result_3.current.data?.receipts?.map((x) => ({
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
