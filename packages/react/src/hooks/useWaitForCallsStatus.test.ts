import { connect, disconnect } from '@wagmi/core'
import { accounts, config, testClient, wait } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import { parseEther } from 'viem'
import { expect, test, vi } from 'vitest'

import { useSendCalls } from './useSendCalls.js'
import { useWaitForCallsStatus } from './useWaitForCallsStatus.js'

const connector = config.connectors[0]!

test('default', async () => {
  await disconnect(config, { connector }).catch(() => {})
  await connect(config, { connector })

  const useSendCalls_render = await renderHook(() => useSendCalls())
  const useWaitForCallsStatus_render = await renderHook(() =>
    useWaitForCallsStatus({ id: useSendCalls_render.result.current.data?.id }),
  )

  useSendCalls_render.result.current.mutate({
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

  await vi.waitUntil(() => useSendCalls_render.result.current.isSuccess, {
    timeout: 10_000,
  })

  expect(useWaitForCallsStatus_render.result.current.fetchStatus).toBe('idle')
  useWaitForCallsStatus_render.rerender()
  expect(useWaitForCallsStatus_render.result.current.fetchStatus).toBe(
    'fetching',
  )

  await wait(1_000)
  await testClient.mainnet.mine({ blocks: 1 })

  await vi.waitUntil(
    () => useWaitForCallsStatus_render.result.current.isSuccess,
    { timeout: 10_000 },
  )

  expect(useWaitForCallsStatus_render.result.current.data?.status).toBe(
    'success',
  )
  expect(
    useWaitForCallsStatus_render.result.current.data?.receipts?.map((x) => ({
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

  await testClient.mainnet.mine({ blocks: 1 })

  await disconnect(config, { connector })
})
