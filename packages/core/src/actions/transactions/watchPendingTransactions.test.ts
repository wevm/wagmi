import { parseEther } from 'viem'
import { beforeEach, describe, expect, it } from 'vitest'

import { sendTransaction } from '.'
import { getWalletClients, setupClient } from '../../../test'
import type { Client } from '../../client'
import { connect } from '../accounts'
import { getPublicClient } from '../viem'
import type { WatchPendingTransactionsResult } from './watchPendingTransactions'
import { watchPendingTransactions } from './watchPendingTransactions'

describe('watchPendingTransactions', () => {
  let client: Client
  beforeEach(() => {
    client = setupClient()
  })

  it(
    'default',
    async () => {
      const results: WatchPendingTransactionsResult = []
      const unsubscribe = watchPendingTransactions({}, (results_) =>
        results.push(...results_),
      )

      const publicClient = getPublicClient()
      await new Promise((res) =>
        setTimeout(() => res(''), publicClient.pollingInterval + 50),
      )

      expect(results.length).toEqual(0)
      unsubscribe()
    },
    { retry: 3 },
  )

  it(
    'new transaction',
    async () => {
      const results: WatchPendingTransactionsResult = []
      const unsubscribe = watchPendingTransactions({}, (results_) =>
        results.push(...results_),
      )

      const walletClients = getWalletClients()
      const to = walletClients[1]
      const toAddress = to?.account.address

      await connect({ connector: client.connectors[0]! })
      await sendTransaction({
        request: {
          to: toAddress,
          value: parseEther('1'),
        },
      })

      const publicClient = getPublicClient()
      await new Promise((res) =>
        setTimeout(() => res(''), publicClient.pollingInterval + 50),
      )

      expect(results.length).toEqual(1)
      unsubscribe()
    },
    { retry: 3 },
  )

  it(
    'unsubscribes + resubscribes',
    async () => {
      const results: WatchPendingTransactionsResult = []
      let unsubscribe = watchPendingTransactions({}, (results_) =>
        results.push(...results_),
      )
      unsubscribe()

      const walletClients = getWalletClients()
      const to = walletClients[1]
      const toAddress = to?.account.address

      await connect({ connector: client.connectors[0]! })
      await sendTransaction({
        request: {
          to: toAddress,
          value: parseEther('1'),
        },
      })

      const publicClient = getPublicClient()
      await new Promise((res) =>
        setTimeout(() => res(''), publicClient.pollingInterval + 50),
      )

      expect(results.length).toEqual(0)

      unsubscribe = watchPendingTransactions({}, (results_) =>
        results.push(...results_),
      )

      await sendTransaction({
        request: {
          to: toAddress,
          value: parseEther('1'),
        },
      })

      await new Promise((res) =>
        setTimeout(() => res(''), publicClient.pollingInterval + 50),
      )

      expect(results.length).toEqual(1)
      unsubscribe()
    },
    { retry: 3 },
  )
})
