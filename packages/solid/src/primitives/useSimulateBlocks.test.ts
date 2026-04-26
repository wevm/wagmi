import { address, mainnet, wait } from '@wagmi/test'
import { renderPrimitive } from '@wagmi/test/solid'
import { expect, test, vi } from 'vitest'

import { useSimulateBlocks } from './useSimulateBlocks.js'

const name4bytes = '0x06fdde03'
const nameResultData =
  '0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000057761676d69000000000000000000000000000000000000000000000000000000'

test('default', async () => {
  const { result } = renderPrimitive(() =>
    useSimulateBlocks(() => ({
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
    })),
  )

  await vi.waitUntil(() => result.isSuccess, { timeout: 5_000 })

  expect(result.data?.[0]?.number).toBe(mainnet.fork.blockNumber)
  expect(result.data?.[0]?.calls[0]).toMatchObject({
    status: 'success',
    data: nameResultData,
  })
})

test('behavior: disabled when properties missing', async () => {
  const { result } = renderPrimitive(() => useSimulateBlocks())

  await wait(100)
  await vi.waitFor(() => expect(result.isPending).toBeTruthy())
})
