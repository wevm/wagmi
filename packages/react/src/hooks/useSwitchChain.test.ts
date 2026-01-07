import { connect, disconnect } from '@wagmi/core'
import { chain, config } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import { expect, test, vi } from 'vitest'

import { useConnection } from './useConnection.js'
import { useSwitchChain } from './useSwitchChain.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })

  const { result, act } = await renderHook(() => ({
    useConnection: useConnection(),
    useSwitchChain: useSwitchChain(),
  }))

  const chainId1 = result.current.useConnection.chainId
  expect(chainId1).toBeDefined()

  await act(() =>
    result.current.useSwitchChain.mutate({ chainId: chain.mainnet2.id }),
  )
  await vi.waitFor(() =>
    expect(result.current.useSwitchChain.isSuccess).toBeTruthy(),
  )

  const chainId2 = result.current.useConnection.chainId
  expect(chainId2).toBeDefined()
  expect(chainId1).not.toBe(chainId2)

  await act(() =>
    result.current.useSwitchChain.mutate({ chainId: chain.mainnet.id }),
  )
  await vi.waitFor(() =>
    expect(result.current.useSwitchChain.isSuccess).toBeTruthy(),
  )

  const chainId3 = result.current.useConnection.chainId
  expect(chainId3).toBeDefined()
  expect(chainId1).toBe(chainId3)

  await disconnect(config, { connector })
})
