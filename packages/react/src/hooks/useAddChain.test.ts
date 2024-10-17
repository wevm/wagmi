import { connect, disconnect } from '@wagmi/core'
import { config } from '@wagmi/test'
import { renderHook, waitFor } from '@wagmi/test/react'
import { avalanche } from 'viem/chains'
import { expect, test } from 'vitest'

import { useAddChain } from './useAddChain.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })

  const { result } = renderHook(() => useAddChain())

  result.current.addChain({ chain: avalanche })
  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  await disconnect(config, { connector })
})

test('no block explorer', async () => {
  await connect(config, { connector })

  const { result } = renderHook(() => useAddChain())

  result.current.addChain({
    chain: { ...avalanche, blockExplorers: undefined },
  })
  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  await disconnect(config, { connector })
})
