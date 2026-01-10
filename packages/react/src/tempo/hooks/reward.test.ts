import { getConnection } from '@wagmi/core'
import { config, renderHook, setupToken } from '@wagmi/test/tempo'
import type { Address } from 'viem'
import { parseUnits } from 'viem'
import { describe, expect, test, vi } from 'vitest'

import { useConnect } from '../../hooks/useConnect.js'
import * as rewardHooks from './reward.js'
import * as tokenHooks from './token.js'

describe('useGetGlobalRewardPerToken', () => {
  test('default', async () => {
    const { token } = await setupToken()

    const { result } = await renderHook(() =>
      rewardHooks.useGetGlobalRewardPerToken({
        token,
      }),
    )

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    expect(result.current.data).toBe(0n)
  })

  test('reactivity: token parameter', async () => {
    const { result, rerender } = await renderHook(
      (props) =>
        rewardHooks.useGetGlobalRewardPerToken({
          token: props?.token,
        }),
      {
        initialProps: {
          token: undefined as Address | undefined,
        },
      },
    )

    await vi.waitFor(() => result.current.fetchStatus === 'idle')

    // Should be disabled when token is undefined
    expect(result.current.data).toBeUndefined()
    expect(result.current.isPending).toBe(true)
    // expect(result.current.isEnabled).toBe(false)

    // Setup token
    const { token } = await setupToken()

    // Set token
    rerender({ token })

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    // Should now be enabled and have data
    // expect(result.current.isEnabled).toBe(true)
    expect(result.current.data).toBe(0n)
  })
})

describe('useUserRewardInfo', () => {
  test('default', async () => {
    const { token } = await setupToken()

    const account = getConnection(config).address

    const { result } = await renderHook(() =>
      rewardHooks.useUserRewardInfo({
        token,
        account,
      }),
    )

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    expect(result.current.data?.rewardRecipient).toBeDefined()
    expect(result.current.data?.rewardPerToken).toBeDefined()
    expect(result.current.data?.rewardBalance).toBeDefined()
  })

  test('reactivity: account and token parameters', async () => {
    const { result, rerender } = await renderHook(
      (props) =>
        rewardHooks.useUserRewardInfo({
          token: props?.token,
          account: props?.account,
        }),
      {
        initialProps: {
          token: undefined as Address | undefined,
          account: undefined as Address | undefined,
        },
      },
    )

    await vi.waitFor(() => result.current.fetchStatus === 'idle')

    // Should be disabled when both token and account are undefined
    expect(result.current.data).toBeUndefined()
    expect(result.current.isPending).toBe(true)
    // expect(result.current.isEnabled).toBe(false)

    // Setup token (this also connects the account)
    const { token } = await setupToken()

    // Set token only (account still undefined)
    rerender({ token, account: undefined })

    await vi.waitFor(() => result.current.fetchStatus === 'idle')

    // Should still be disabled when account is undefined
    expect(result.current.data).toBeUndefined()
    expect(result.current.isPending).toBe(true)
    // expect(result.current.isEnabled).toBe(false)

    // Get account from config (already connected by setupToken)
    const account = getConnection(config).address

    // Set both token and account
    rerender({ token, account })

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    // Should now be enabled and have data
    // expect(result.current.isEnabled).toBe(true)
    expect(result.current.data?.rewardRecipient).toBeDefined()
    expect(result.current.data?.rewardPerToken).toBeDefined()
    expect(result.current.data?.rewardBalance).toBeDefined()
  })
})

describe('useSetRecipientSync', () => {
  test('default', async () => {
    const { result } = await renderHook(() => ({
      connect: useConnect(),
      setRecipient: rewardHooks.useSetRecipientSync(),
    }))

    await result.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    const { token } = await setupToken()

    await result.current.setRecipient.mutateAsync({
      recipient: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
      token,
    })

    await vi.waitFor(() =>
      expect(result.current.setRecipient.isSuccess).toBeTruthy(),
    )
  })
})

describe('useWatchRewardDistributed', () => {
  test('default', async () => {
    const { result: connectResult } = await renderHook(() => ({
      connect: useConnect(),
      grantRolesSync: tokenHooks.useGrantRolesSync(),
      mintSync: tokenHooks.useMintSync(),
      setRecipientSync: rewardHooks.useSetRecipientSync(),
      distributeSync: rewardHooks.useDistributeSync(),
    }))

    await connectResult.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    const { token: tokenAddr } = await setupToken()

    const account = getConnection(config).address

    await connectResult.current.grantRolesSync.mutateAsync({
      token: tokenAddr,
      roles: ['issuer'],
      to: account!,
    })

    const rewardAmount = parseUnits('100', 6)
    await connectResult.current.mintSync.mutateAsync({
      token: tokenAddr,
      to: account!,
      amount: rewardAmount,
    })

    await connectResult.current.setRecipientSync.mutateAsync({
      token: tokenAddr,
      recipient: account!,
    })

    const events: any[] = []
    await renderHook(() =>
      rewardHooks.useWatchRewardDistributed({
        token: tokenAddr,
        onRewardDistributed(args) {
          events.push(args)
        },
      }),
    )

    await connectResult.current.distributeSync.mutateAsync({
      token: tokenAddr,
      amount: rewardAmount,
    })

    await vi.waitUntil(() => events.length >= 1)

    expect(events.length).toBeGreaterThanOrEqual(1)
    expect(events[0]?.amount).toBe(rewardAmount)
    expect(events[0]?.funder).toBe(account)
  })
})

describe('useWatchRewardRecipientSet', () => {
  test('default', async () => {
    const { result: connectResult } = await renderHook(() => ({
      connect: useConnect(),
      setRecipientSync: rewardHooks.useSetRecipientSync(),
    }))

    await connectResult.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    const { token: tokenAddr } = await setupToken()

    const account = getConnection(config).address

    const events: any[] = []
    await renderHook(() =>
      rewardHooks.useWatchRewardRecipientSet({
        token: tokenAddr,
        onRewardRecipientSet(args) {
          events.push(args)
        },
      }),
    )

    await connectResult.current.setRecipientSync.mutateAsync({
      token: tokenAddr,
      recipient: account!,
    })

    await vi.waitUntil(() => events.length >= 1)

    expect(events.length).toBeGreaterThanOrEqual(1)
    expect(events[0]?.holder).toBe(account)
    expect(events[0]?.recipient).toBe(account)
  })
})
