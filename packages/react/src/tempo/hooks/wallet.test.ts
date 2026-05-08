import { disconnect } from '@wagmi/core'
import { config, renderHook } from '@wagmi/test/tempo'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { useConnect } from '../../hooks/useConnect.js'
import { useDeposit, useSend, useSwap } from './wallet.js'

const connector = config.connectors[2]!

beforeEach(async () => {
  await disconnect(config).catch(() => {})
})

describe('useSend', () => {
  test('default', async () => {
    const { result } = await renderHook(() => ({
      connect: useConnect(),
      send: useSend(),
    }))

    await result.current.connect.connectAsync({ connector })

    const data = await result.current.send.mutateAsync({
      to: '0x0000000000000000000000000000000000000003',
      token: '0x0000000000000000000000000000000000000004',
      value: '1.5',
    })

    expect(data.receipt).toBeDefined()
    expect(data.chainId).toBe(1337)

    await vi.waitFor(() => expect(result.current.send.isSuccess).toBeTruthy())
  })
})

describe('useSwap', () => {
  test('default', async () => {
    const { result } = await renderHook(() => ({
      connect: useConnect(),
      swap: useSwap(),
    }))

    await result.current.connect.connectAsync({ connector })

    const data = await result.current.swap.mutateAsync({
      amount: '2.5',
      pairToken: '0x0000000000000000000000000000000000000003',
      slippage: 0.05,
      token: '0x0000000000000000000000000000000000000004',
      type: 'sell',
    })

    expect(data.receipt).toBeDefined()

    await vi.waitFor(() => expect(result.current.swap.isSuccess).toBeTruthy())
  })
})

describe('useDeposit', () => {
  test('default', async () => {
    const { result } = await renderHook(() => ({
      connect: useConnect(),
      deposit: useDeposit(),
    }))

    await result.current.connect.connectAsync({ connector })

    const data = await result.current.deposit.mutateAsync({
      address: '0x0000000000000000000000000000000000000003',
      chainId: 1,
      displayName: 'Account',
      token: '0x0000000000000000000000000000000000000004',
      value: '3.5',
    })

    expect(data?.receipts).toBeDefined()

    await vi.waitFor(() =>
      expect(result.current.deposit.isSuccess).toBeTruthy(),
    )
  })
})
