import { accounts, testClient } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import { parseEther } from 'viem'
import { expect, test, vi } from 'vitest'

import { useBlock } from './useBlock.js'

test('mounts', async () => {
  const { result } = await renderHook(() => useBlock())

  await vi.waitUntil(() => result.current.isSuccess, { timeout: 10_000 })

  const { data, ...rest } = result.current
  expect(data).toBeDefined()
  expect(rest).toMatchInlineSnapshot(`
    {
      "dataUpdatedAt": 1675209600000,
      "error": null,
      "errorUpdateCount": 0,
      "errorUpdatedAt": 0,
      "failureCount": 0,
      "failureReason": null,
      "fetchStatus": "idle",
      "isError": false,
      "isFetched": true,
      "isFetchedAfterMount": true,
      "isFetching": false,
      "isInitialLoading": false,
      "isLoading": false,
      "isLoadingError": false,
      "isPaused": false,
      "isPending": false,
      "isPlaceholderData": false,
      "isRefetchError": false,
      "isRefetching": false,
      "isStale": true,
      "isSuccess": true,
      "queryKey": [
        "block",
        {
          "chainId": 1,
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: watch', async () => {
  await testClient.mainnet.restart()

  const { result } = await renderHook(() => useBlock({ watch: true }))

  await vi.waitUntil(() => result.current.isSuccess, { timeout: 10_000 })
  const block = result.current.data!
  expect(block).toBeDefined()

  await testClient.mainnet.mine({ blocks: 1 })
  await vi.waitFor(() => {
    expect(result.current.data?.number).toEqual(block.number + 1n)
  })

  await testClient.mainnet.mine({ blocks: 1 })
  await vi.waitFor(() => {
    expect(result.current.data?.number).toEqual(block.number + 2n)
  })
})

test('parameters: watch (includeTransactions)', async () => {
  await testClient.mainnet.mine({ blocks: 1 })

  const { result } = await renderHook(() =>
    useBlock({ includeTransactions: true, watch: true }),
  )

  await vi.waitUntil(() => result.current.isSuccess, { timeout: 10_000 })
  const block = result.current.data!
  expect(block).toBeDefined()

  await testClient.mainnet.setBalance({
    address: accounts[0],
    value: parseEther('10'),
  })
  await testClient.mainnet.sendUnsignedTransaction({
    from: accounts[0],
    to: accounts[1],
    value: parseEther('1'),
  })
  await testClient.mainnet.mine({ blocks: 1 })

  await vi.waitFor(() => {
    expect(result.current.data?.number).toEqual(block.number + 1n)
  })

  const transactions = result.current.data!.transactions
  expect(transactions.length).toBeGreaterThan(0)
  expect(typeof transactions[0]).not.toBe('string')
})
