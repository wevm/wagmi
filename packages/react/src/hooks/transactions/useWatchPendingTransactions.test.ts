import type { Hex } from 'viem'
import { parseEther } from 'viem'
import { describe, expect, it, test, vi } from 'vitest'

import { actConnect, renderHook } from '../../../test'
import { sendTransaction } from '../../actions'
import { useConnect } from '../accounts'
import { usePublicClient } from '../viem'
import type { UseWatchPendingTransactionsConfig } from './useWatchPendingTransactions'
import { useWatchPendingTransactions } from './useWatchPendingTransactions'

function useWatchPendingTransactionsWithPublicClient(
  config: UseWatchPendingTransactionsConfig,
) {
  return {
    connect: useConnect(),
    publicClient: usePublicClient(),
    watchPendingTransactions: useWatchPendingTransactions(config),
  }
}

describe('useWatchPendingTransactions', () => {
  it('default', async () => {
    const pendingTransactions: Hex[][] = []
    const { result, unmount } = renderHook(() =>
      useWatchPendingTransactionsWithPublicClient({
        listener: pendingTransactions.push,
      }),
    )

    const publicClient = result.current.publicClient
    await new Promise((res) =>
      setTimeout(() => res(''), publicClient.pollingInterval + 50),
    )

    expect(pendingTransactions.length).toEqual(0)

    unmount()
  })

  it('listens to incoming transactions', async () => {
    const listener = vi.fn()
    const utils = renderHook(() =>
      useWatchPendingTransactionsWithPublicClient({
        listener,
      }),
    )
    const { result, unmount } = utils

    await actConnect({ utils })
    await sendTransaction!({
      request: {
        to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
        value: parseEther('1'),
      },
    })

    const publicClient = result.current.publicClient
    await new Promise((res) =>
      setTimeout(() => res(''), publicClient.pollingInterval + 50),
    )

    expect(listener).toBeCalledTimes(1)

    unmount()
  })

  describe('args', () => {
    test('enabled', async () => {
      let enabled = true
      const listener = vi.fn()
      const utils = renderHook(() =>
        useWatchPendingTransactionsWithPublicClient({
          enabled,
          listener,
        }),
      )
      const { result, rerender } = utils

      await actConnect({ utils })
      await sendTransaction!({
        request: {
          to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
          value: parseEther('1'),
        },
      })

      const publicClient = result.current.publicClient
      await new Promise((res) =>
        setTimeout(() => res(''), publicClient.pollingInterval + 50),
      )

      expect(listener).toBeCalledTimes(1)

      enabled = false
      rerender()

      await actConnect({ utils })
      await sendTransaction!({
        request: {
          to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
          value: parseEther('1'),
        },
      })

      await new Promise((res) =>
        setTimeout(() => res(''), publicClient.pollingInterval + 50),
      )

      expect(listener).toBeCalledTimes(1)

      utils.unmount()
    })
  })
})
