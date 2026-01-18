import { connect, disconnect } from '@wagmi/core'
import { chain, config } from '@wagmi/test'
import { renderPrimitive } from '@wagmi/test/solid'
import { expect, test, vi } from 'vitest'

import { useConnection } from './useConnection.js'
import { useSwitchChain } from './useSwitchChain.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })

  const { result } = renderPrimitive(() => ({
    useConnection: useConnection(),
    useSwitchChain: useSwitchChain(),
  }))

  const chainId1 = result.useConnection().chainId
  expect(chainId1).toBeDefined()

  result.useSwitchChain.mutate({ chainId: chain.mainnet2.id })
  await vi.waitFor(() => expect(result.useSwitchChain.isSuccess).toBeTruthy())
  const chainId2 = result.useConnection().chainId
  expect(chainId2).toBeDefined()
  expect(chainId1).not.toBe(chainId2)

  result.useSwitchChain.mutate({ chainId: chain.mainnet.id })
  await vi.waitFor(() => expect(result.useSwitchChain.isSuccess).toBeTruthy())

  const chainId3 = result.useConnection().chainId
  expect(chainId3).toBeDefined()
  expect(chainId1).toBe(chainId3)

  await disconnect(config, { connector })
})
