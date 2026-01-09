import { accounts, renderHook, restart } from '@wagmi/test/tempo'
import type { Address } from 'viem'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import * as nonce from './nonce.js'
import * as token from './token.js'

const account = accounts[0]
const account2 = accounts[1]

beforeEach(async () => {
  await restart()
})

describe('useNonce', () => {
  test('default', async () => {
    let testAccount: Address | undefined
    let testNonceKey: bigint | undefined

    const { result, rerender } = await renderHook(() =>
      nonce.useNonce({ account: testAccount, nonceKey: testNonceKey }),
    )

    await vi.waitFor(() => result.current.fetchStatus === 'fetching')

    // Should be disabled when account is undefined
    expect(result.current.data).toBeUndefined()
    expect(result.current.isPending).toBe(true)
    // expect(result.current.isEnabled).toBe(false)

    // Set account and nonceKey
    // TODO: pass these to `rerender`
    testAccount = account.address
    testNonceKey = 1n
    rerender()

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy(), {
      timeout: 5_000,
    })

    // Should now be enabled and have data
    // expect(result.current.isEnabled).toBe(true)
    expect(result.current.data).toBe(0n)
  })

  test('reactivity: account parameter', async () => {
    let testAccount: Address | undefined

    const { result, rerender } = await renderHook(() =>
      nonce.useNonce({ account: testAccount, nonceKey: 1n }),
    )

    await vi.waitFor(() => result.current.fetchStatus === 'fetching')

    // Should be disabled when account is undefined
    // expect(result.current.isEnabled).toBe(false)

    // Set account
    testAccount = account.address
    rerender()

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy(), {
      timeout: 5_000,
    })

    // expect(result.current.isEnabled).toBe(true)
    expect(result.current.data).toBe(0n)
  })

  test('reactivity: nonceKey parameter', async () => {
    let testNonceKey: bigint | undefined

    const { result, rerender } = await renderHook(() =>
      nonce.useNonce({ account: account.address, nonceKey: testNonceKey }),
    )

    await vi.waitFor(() => result.current.fetchStatus === 'fetching')

    // Should be disabled when nonceKey is undefined
    // expect(result.current.isEnabled).toBe(false)

    // Set nonceKey
    testNonceKey = 1n
    rerender()

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy(), {
      timeout: 5_000,
    })

    // expect(result.current.isEnabled).toBe(true)
    expect(result.current.data).toBe(0n)
  })
})

describe('useWatchNonceIncremented', () => {
  test('default', async () => {
    const { result: connectResult } = await renderHook(() => ({
      transferSync: token.useTransferSync(),
    }))

    const events: any[] = []
    await renderHook(() =>
      nonce.useWatchNonceIncremented({
        onNonceIncremented(args) {
          events.push(args)
        },
        args: {
          account: account.address,
          nonceKey: 5n,
        },
      }),
    )

    // Have to manually set nonce because eth_FillTransaction does not support nonce keys
    await connectResult.current.transferSync.mutateAsync({
      to: account2.address,
      amount: 1n,
      token: 1n,
      nonceKey: 5n,
      nonce: 0,
    })

    await connectResult.current.transferSync.mutateAsync({
      to: account2.address,
      amount: 1n,
      token: 1n,
      nonceKey: 5n,
      nonce: 1,
    })

    await vi.waitUntil(() => events.length >= 2)

    expect(events).toHaveLength(2)
    expect(events[0]?.account).toBe(account.address)
    expect(events[0]?.nonceKey).toBe(5n)
    expect(events[0]?.newNonce).toBe(1n)
    expect(events[1]?.newNonce).toBe(2n)
  })
})
