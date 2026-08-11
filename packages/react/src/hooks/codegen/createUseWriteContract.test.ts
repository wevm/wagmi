import { connect, disconnect } from '@wagmi/core'
import { abi, address, chain, config } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import { expect, test, vi } from 'vitest'

import { createUseWriteContract } from './createUseWriteContract.js'

test('default', () => {
  const useWriteErc20 = createUseWriteContract({
    abi: abi.erc20,
  })

  renderHook(() => useWriteErc20())
})

const connector = config.connectors[0]!

test('multichain', async () => {
  const useWriteWagmiMintExample = createUseWriteContract({
    address: {
      [chain.mainnet.id]: address.wagmiMintExample,
      [chain.mainnet2.id]: address.wagmiMintExample,
    },
    abi: abi.wagmiMintExample,
  })

  await connect(config, { connector })

  const { result } = await renderHook(() => useWriteWagmiMintExample())

  result.current.writeContract({ functionName: 'mint' })
  await vi.waitUntil(() => result.current.isSuccess, { timeout: 10_000 })

  console.log(result.current.data)
  expect(result.current.data).toBeDefined()

  await disconnect(config, { connector })
})
