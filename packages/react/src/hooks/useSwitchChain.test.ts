import { connect, disconnect } from '@wagmi/core'
import { chain, config } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import { expect, test, vi } from 'vitest'

import { useAccount } from './useAccount.js'
import { useSwitchChain } from './useSwitchChain.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })

  const { result, act } = await renderHook(() => ({
    useAccount: useAccount(),
    useSwitchChain: useSwitchChain(),
  }))

  const chainId1 = result.current.useAccount.chainId
  expect(chainId1).toBeDefined()

  await act(() =>
    result.current.useSwitchChain.switchChain({ chainId: chain.mainnet2.id }),
  )
  await vi.waitFor(() =>
    expect(result.current.useSwitchChain.isSuccess).toBeTruthy(),
  )

  const chainId2 = result.current.useAccount.chainId
  expect(chainId2).toBeDefined()
  expect(chainId1).not.toBe(chainId2)

  await act(() =>
    result.current.useSwitchChain.switchChain({ chainId: chain.mainnet.id }),
  )
  await vi.waitFor(() =>
    expect(result.current.useSwitchChain.isSuccess).toBeTruthy(),
  )

  const chainId3 = result.current.useAccount.chainId
  expect(chainId3).toBeDefined()
  expect(chainId1).toBe(chainId3)

  await disconnect(config, { connector })
})

test('behavior: chains updates', async () => {
  const { act, result } = await renderHook(() => useSwitchChain())

  const chains = result.current.chains
  expect(
    result.current.chains.map(({ id, name }) => ({
      id,
      name,
    })),
  ).toMatchInlineSnapshot(`
    [
      {
        "id": 1,
        "name": "Ethereum",
      },
      {
        "id": 456,
        "name": "Ethereum",
      },
      {
        "id": 10,
        "name": "OP Mainnet",
      },
    ]
  `)

  await act(() =>
    config._internal.chains.setState([chain.mainnet, chain.mainnet2]),
  )

  expect(
    result.current.chains.map(({ id, name }) => ({
      id,
      name,
    })),
  ).toMatchInlineSnapshot(`
    [
      {
        "id": 1,
        "name": "Ethereum",
      },
      {
        "id": 456,
        "name": "Ethereum",
      },
    ]
  `)

  await act(() => config._internal.chains.setState(chains))

  expect(
    result.current.chains.map(({ id, name }) => ({
      id,
      name,
    })),
  ).toMatchInlineSnapshot(`
    [
      {
        "id": 1,
        "name": "Ethereum",
      },
      {
        "id": 456,
        "name": "Ethereum",
      },
      {
        "id": 10,
        "name": "OP Mainnet",
      },
    ]
  `)
})
