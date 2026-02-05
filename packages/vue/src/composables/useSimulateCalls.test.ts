import { connect, disconnect } from '@wagmi/core'
import { address, config, mainnet, wait } from '@wagmi/test'
import { renderComposable, waitFor } from '@wagmi/test/vue'
import { expect, test } from 'vitest'

import { useSimulateCalls } from './useSimulateCalls.js'

const connector = config.connectors[0]!
const name4bytes = '0x06fdde03'
const nameResultData =
  '0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000057761676d69000000000000000000000000000000000000000000000000000000'

test('default', async () => {
  await connect(config, { connector })

  const [query] = renderComposable(() =>
    useSimulateCalls({
      calls: [
        {
          data: name4bytes,
          to: address.wagmiMintExample,
        },
      ],
    }),
  )

  await waitFor(query.isSuccess)

  expect(query.data.value?.assetChanges).toEqual([])
  expect(query.data.value?.block.number).toBe(mainnet.fork.blockNumber)
  expect(query.data.value?.results[0]).toMatchObject({
    status: 'success',
    data: nameResultData,
  })

  await disconnect(config, { connector })
})

test('behavior: disabled when properties missing', async () => {
  const [query] = renderComposable(() => useSimulateCalls())

  await wait(100)

  expect(query.fetchStatus.value).toBe('idle')
})

test('behavior: disabled when traceAssetChanges without account or connector', async () => {
  const [query] = renderComposable(() =>
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

  expect(query.fetchStatus.value).toBe('idle')
})
