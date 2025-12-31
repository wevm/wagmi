import type { Address } from 'viem'
import { describe, expect, test, vi } from 'vitest'
import { accounts, renderHook } from '../../test/config.js'
import * as nonce from './nonce.js'

const account = accounts[0]

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
    expect(result.current.isEnabled).toBe(false)

    // Set account and nonceKey
    // TODO: pass these to `rerender`
    testAccount = account.address
    testNonceKey = 1n
    rerender()

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy(), {
      timeout: 5_000,
    })

    // Should now be enabled and have data
    expect(result.current.isEnabled).toBe(true)
    expect(result.current.data).toBe(0n)
  })

  test('reactivity: account parameter', async () => {
    let testAccount: Address | undefined

    const { result, rerender } = await renderHook(() =>
      nonce.useNonce({ account: testAccount, nonceKey: 1n }),
    )

    await vi.waitFor(() => result.current.fetchStatus === 'fetching')

    // Should be disabled when account is undefined
    expect(result.current.isEnabled).toBe(false)

    // Set account
    testAccount = account.address
    rerender()

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy(), {
      timeout: 5_000,
    })

    expect(result.current.isEnabled).toBe(true)
    expect(result.current.data).toBe(0n)
  })

  test('reactivity: nonceKey parameter', async () => {
    let testNonceKey: bigint | undefined

    const { result, rerender } = await renderHook(() =>
      nonce.useNonce({ account: account.address, nonceKey: testNonceKey }),
    )

    await vi.waitFor(() => result.current.fetchStatus === 'fetching')

    // Should be disabled when nonceKey is undefined
    expect(result.current.isEnabled).toBe(false)

    // Set nonceKey
    testNonceKey = 1n
    rerender()

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy(), {
      timeout: 5_000,
    })

    expect(result.current.isEnabled).toBe(true)
    expect(result.current.data).toBe(0n)
  })
})
