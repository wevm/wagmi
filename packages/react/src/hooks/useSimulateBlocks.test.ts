import { address, mainnet, wait } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import { expect, test, vi } from 'vitest'

import { useSimulateBlocks } from './useSimulateBlocks.js'

const name4bytes = '0x06fdde03'
const nameResultData =
  '0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000057761676d69000000000000000000000000000000000000000000000000000000'

test('default', async () => {
  const { result } = await renderHook(() =>
    useSimulateBlocks({
      blocks: [
        {
          calls: [
            {
              data: name4bytes,
              to: address.wagmiMintExample,
            },
          ],
        },
      ],
    }),
  )

  await vi.waitUntil(() => result.current.isSuccess, { timeout: 5_000 })

  expect(result.current.data?.[0]?.number).toBe(mainnet.fork.blockNumber)
  expect(result.current.data?.[0]?.calls[0]).toMatchObject({
    status: 'success',
    data: nameResultData,
  })
})

test('behavior: disabled when properties missing', async () => {
  const { result } = await renderHook(() => useSimulateBlocks())

  await wait(100)
  await vi.waitFor(() => expect(result.current.isPending).toBeTruthy())
})
