import { disconnect, getConnection } from '@wagmi/core'
import { accounts, config, renderHook, setupToken } from '@wagmi/test/tempo'
import type { Address } from 'viem'
import { parseUnits } from 'viem'
import { beforeAll, beforeEach, describe, expect, test, vi } from 'vitest'

import { useConnect } from '../../hooks/useConnect.js'
import * as rewardHooks from './reward.js'
import * as tokenHooks from './token.js'

let rewardRateToken: Awaited<ReturnType<typeof setupToken>>['token']
let userRewardInfoToken: Awaited<ReturnType<typeof setupToken>>['token']
let setRecipientToken: Awaited<ReturnType<typeof setupToken>>['token']
let distributedWatchToken: Awaited<ReturnType<typeof setupToken>>['token']
let recipientWatchToken: Awaited<ReturnType<typeof setupToken>>['token']

beforeAll(async () => {
  ;({ token: rewardRateToken } = await setupToken())
  ;({ token: userRewardInfoToken } = await setupToken())
  ;({ token: setRecipientToken } = await setupToken())
  ;({ token: distributedWatchToken } = await setupToken())
  ;({ token: recipientWatchToken } = await setupToken())
  await disconnect(config).catch(() => {})
})

beforeEach(async () => {
  await disconnect(config).catch(() => {})
})

describe('reward', () => {
  describe('useGetGlobalRewardPerToken', () => {
    test('default', async () => {
      const { result } = await renderHook(() =>
        rewardHooks.useGetGlobalRewardPerToken({
          token: rewardRateToken,
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

      await vi.waitFor(() => expect(result.current.fetchStatus).toBe('idle'))

      // Should be disabled when token is undefined
      expect(result.current.data).toBeUndefined()
      expect(result.current.isPending).toBe(true)
      // expect(result.current.isEnabled).toBe(false)

      // Set token
      rerender({ token: rewardRateToken })

      await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())

      // Should now be enabled and have data
      // expect(result.current.isEnabled).toBe(true)
      expect(result.current.data).toBe(0n)
    })
  })

  describe('useUserRewardInfo', () => {
    test('default', async () => {
      const { result } = await renderHook(() =>
        rewardHooks.useUserRewardInfo({
          token: userRewardInfoToken,
          account: accounts[0].address,
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

      await vi.waitFor(() => expect(result.current.fetchStatus).toBe('idle'))

      // Should be disabled when both token and account are undefined
      expect(result.current.data).toBeUndefined()
      expect(result.current.isPending).toBe(true)
      // expect(result.current.isEnabled).toBe(false)

      // Set token only (account still undefined)
      rerender({ token: userRewardInfoToken, account: undefined })

      await vi.waitFor(() => expect(result.current.fetchStatus).toBe('idle'))

      // Should still be disabled when account is undefined
      expect(result.current.data).toBeUndefined()
      expect(result.current.isPending).toBe(true)
      // expect(result.current.isEnabled).toBe(false)

      // Set both token and account
      rerender({ token: userRewardInfoToken, account: accounts[0].address })

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
      await disconnect(config).catch(() => {})

      const { result } = await renderHook(() => ({
        connect: useConnect(),
        setRecipient: rewardHooks.useSetRecipientSync(),
      }))

      await result.current.connect.mutateAsync({
        connector: config.connectors[0]!,
      })

      await result.current.setRecipient.mutateAsync({
        recipient: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
        token: setRecipientToken,
      })
    })
  })

  describe('useWatchRewardDistributed', () => {
    test('default', async () => {
      await disconnect(config).catch(() => {})

      const { result: connectResult } = await renderHook(() => ({
        connect: useConnect(),
        mintSync: tokenHooks.useMintSync(),
        setRecipientSync: rewardHooks.useSetRecipientSync(),
        distributeSync: rewardHooks.useDistributeSync(),
      }))

      await connectResult.current.connect.mutateAsync({
        connector: config.connectors[0]!,
      })

      const account = getConnection(config).address

      const rewardAmount = parseUnits('100', 6)
      await connectResult.current.mintSync.mutateAsync({
        token: distributedWatchToken,
        to: account!,
        amount: rewardAmount,
      })

      await connectResult.current.setRecipientSync.mutateAsync({
        token: distributedWatchToken,
        recipient: account!,
      })

      const events: any[] = []
      await renderHook(() =>
        rewardHooks.useWatchRewardDistributed({
          token: distributedWatchToken,
          onRewardDistributed(args) {
            events.push(args)
          },
        }),
      )

      await connectResult.current.distributeSync.mutateAsync({
        token: distributedWatchToken,
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
      await disconnect(config).catch(() => {})

      const { result: connectResult } = await renderHook(() => ({
        connect: useConnect(),
        setRecipientSync: rewardHooks.useSetRecipientSync(),
      }))

      await connectResult.current.connect.mutateAsync({
        connector: config.connectors[0]!,
      })

      const account = getConnection(config).address

      const events: any[] = []
      await renderHook(() =>
        rewardHooks.useWatchRewardRecipientSet({
          token: recipientWatchToken,
          onRewardRecipientSet(args) {
            events.push(args)
          },
        }),
      )

      await connectResult.current.setRecipientSync.mutateAsync({
        token: recipientWatchToken,
        recipient: account!,
      })

      await vi.waitUntil(() => events.length >= 1)

      expect(events.length).toBeGreaterThanOrEqual(1)
      expect(events[0]?.holder).toBe(account)
      expect(events[0]?.recipient).toBe(account)
    })
  })
})
