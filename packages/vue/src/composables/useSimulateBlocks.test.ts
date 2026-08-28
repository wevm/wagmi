import { address, mainnet, wait } from '@wagmi/test'
import { renderComposable, waitFor } from '@wagmi/test/vue'
import { expect, test } from 'vitest'

import { useSimulateBlocks } from './useSimulateBlocks.js'

const name4bytes = '0x06fdde03'
const nameResultData =
  '0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000057761676d69000000000000000000000000000000000000000000000000000000'

test('default', async () => {
  const [query] = renderComposable(() =>
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

  await waitFor(query.isSuccess)

  expect(query.data.value?.[0]?.number).toBe(mainnet.fork.blockNumber)
  expect(query.data.value?.[0]?.calls[0]).toMatchObject({
    status: 'success',
    data: nameResultData,
  })
})

test('behavior: disabled when properties missing', async () => {
  const [query] = renderComposable(() => useSimulateBlocks())

  await wait(100)

  expect(query.fetchStatus.value).toBe('idle')
})
