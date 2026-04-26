import { connect, disconnect } from '@wagmi/core'
import { accounts, address, config, mainnet, wait } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import { expect, test, vi } from 'vitest'

import { useSimulateCalls } from './useSimulateCalls.js'

const connector = config.connectors[0]!
const name4bytes = '0x06fdde03'
const nameResultData =
  '0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000057761676d69000000000000000000000000000000000000000000000000000000'

test('default', async () => {
  await connect(config, { connector })

  const { result } = await renderHook(() =>
    useSimulateCalls({
      calls: [
        {
          data: name4bytes,
          to: address.wagmiMintExample,
        },
      ],
    }),
  )

  await vi.waitUntil(() => result.current.isSuccess, { timeout: 5_000 })

  expect(result.current.data?.assetChanges).toEqual([])
  expect(result.current.data?.block.number).toBe(mainnet.fork.blockNumber)
  expect(result.current.data?.results[0]).toMatchObject({
    status: 'success',
    data: nameResultData,
  })
  expect(result.current.queryKey).toMatchObject([
    'simulateCalls',
    expect.objectContaining({
      account: accounts[0],
    }),
  ])

  await disconnect(config, { connector })
})

test('behavior: disabled when properties missing', async () => {
  const { result } = await renderHook(() => useSimulateCalls())

  await wait(100)
  await vi.waitFor(() => expect(result.current.isPending).toBeTruthy())
})

test('behavior: disabled when traceAssetChanges without account or connector', async () => {
  const { result } = await renderHook(() =>
    useSimulateCalls({
      calls: [
        {
          data: name4bytes,
          to: address.wagmiMintExample,
        },
      ],
      traceAssetChanges: true,
    }),
  )

  await wait(100)
  await vi.waitFor(() => expect(result.current.isPending).toBeTruthy())
})
