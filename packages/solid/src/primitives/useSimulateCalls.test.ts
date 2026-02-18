import { connect, disconnect } from '@wagmi/core'
import { address, config, mainnet, wait } from '@wagmi/test'
import { renderPrimitive } from '@wagmi/test/solid'
import { expect, test, vi } from 'vitest'

import { useSimulateCalls } from './useSimulateCalls.js'

const connector = config.connectors[0]!
const name4bytes = '0x06fdde03'
const nameResultData =
  '0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000057761676d69000000000000000000000000000000000000000000000000000000'

test('default', async () => {
  await connect(config, { connector })

  const { result } = renderPrimitive(() =>
    useSimulateCalls(() => ({
      calls: [
        {
          data: name4bytes,
          to: address.wagmiMintExample,
        },
      ],
    })),
  )

  await vi.waitUntil(() => result.isSuccess, { timeout: 5_000 })

  expect(result.data?.assetChanges).toEqual([])
  expect(result.data?.block.number).toBe(mainnet.fork.blockNumber)
  expect(result.data?.results[0]).toMatchObject({
    status: 'success',
    data: nameResultData,
  })

  await disconnect(config, { connector })
})

test('behavior: disabled when properties missing', async () => {
  const { result } = renderPrimitive(() => useSimulateCalls())

  await wait(100)
  await vi.waitFor(() => expect(result.isPending).toBeTruthy())
})

test('behavior: disabled when traceAssetChanges without account or connector', async () => {
  const { result } = renderPrimitive(() =>
    useSimulateCalls(() => ({
      calls: [
        {
          data: name4bytes,
          to: address.wagmiMintExample,
        },
      ],
      traceAssetChanges: true,
    })),
  )

  await wait(100)
  await vi.waitFor(() => expect(result.isPending).toBeTruthy())
})
