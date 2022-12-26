import type { Transaction } from 'ethers'
import { parseEther } from 'ethers/lib/utils.js'
import { describe, expect, it, test, vi } from 'vitest'

import { actConnect, renderHook } from '../../../test'
import { sendTransaction } from '../../actions'
import { useConnect } from '../accounts'
import { useProvider } from '../providers'
import type { UseWatchPendingTransactionsConfig } from './useWatchPendingTransactions'
import { useWatchPendingTransactions } from './useWatchPendingTransactions'

function useWatchPendingTransactionsWithProvider(
  config: UseWatchPendingTransactionsConfig,
) {
  return {
    connect: useConnect(),
    provider: useProvider(),
    watchPendingTransactions: useWatchPendingTransactions(config),
  }
}

describe('useWatchPendingTransactions', () => {
  it('default', async () => {
    const pendingTransactions: Transaction[] = []
    const { result } = renderHook(() =>
      useWatchPendingTransactionsWithProvider({
        listener: pendingTransactions.push,
      }),
    )

    const provider = result.current.provider
    await new Promise((res) =>
      setTimeout(() => res(''), provider.pollingInterval + 50),
    )

    expect(pendingTransactions.length).toEqual(0)
  })

  it('listens to incoming transactions', async () => {
    const listener = vi.fn()
    const utils = renderHook(() =>
      useWatchPendingTransactionsWithProvider({
        listener,
      }),
    )
    const { result } = utils

    await actConnect({ utils })
    await sendTransaction!({
      mode: 'recklesslyUnprepared',
      request: {
        to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
        value: parseEther('1'),
      },
    })

    const provider = result.current.provider
    await new Promise((res) =>
      setTimeout(() => res(''), provider.pollingInterval + 50),
    )

    expect(listener).toBeCalledTimes(1)
  })

  describe('args', () => {
    test('enabled', async () => {
      let enabled = true
      const listener = vi.fn()
      const utils = renderHook(() =>
        useWatchPendingTransactionsWithProvider({
          enabled,
          listener,
        }),
      )
      const { result, rerender } = utils

      await actConnect({ utils })
      await sendTransaction!({
        mode: 'recklesslyUnprepared',
        request: {
          to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
          value: parseEther('1'),
        },
      })

      const provider = result.current.provider
      await new Promise((res) =>
        setTimeout(() => res(''), provider.pollingInterval + 50),
      )

      expect(listener).toBeCalledTimes(1)

      enabled = false
      rerender()

      await actConnect({ utils })
      await sendTransaction!({
        mode: 'recklesslyUnprepared',
        request: {
          to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
          value: parseEther('1'),
        },
      })

      await new Promise((res) =>
        setTimeout(() => res(''), provider.pollingInterval + 50),
      )

      expect(listener).toBeCalledTimes(1)
    })
  })
})
