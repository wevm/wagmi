import { parseEther } from 'viem'
import { beforeEach, describe, expect, it } from 'vitest'

import { sendTransaction } from '.'
import { getSigners, setupClient } from '../../../test'
import type { Client } from '../../client'
import { connect } from '../accounts'
import { getProvider } from '../providers'
import type { WatchPendingTransactionsResult } from './watchPendingTransactions'
import { watchPendingTransactions } from './watchPendingTransactions'

describe('watchPendingTransactions', () => {
  let client: Client
  beforeEach(() => {
    client = setupClient()
  })

  it('default', async () => {
    const results: WatchPendingTransactionsResult = []
    const unsubscribe = watchPendingTransactions({}, (results_) =>
      results.push(...results_),
    )

    const provider = getProvider()
    await new Promise((res) =>
      setTimeout(() => res(''), provider.pollingInterval + 50),
    )

    expect(results.length).toEqual(0)
    unsubscribe()
  })

  it('new transaction', async () => {
    const results: WatchPendingTransactionsResult = []
    const unsubscribe = watchPendingTransactions({}, (results_) =>
      results.push(...results_),
    )

    const signers = getSigners()
    const to = signers[1]
    const toAddress = to?.account.address

    await connect({ connector: client.connectors[0]! })
    await sendTransaction({
      mode: 'recklesslyUnprepared',
      request: {
        to: toAddress,
        value: parseEther('1'),
      },
    })

    const provider = getProvider()
    await new Promise((res) =>
      setTimeout(() => res(''), provider.pollingInterval + 50),
    )

    expect(results.length).toEqual(1)
    unsubscribe()
  })

  it('unsubscribes + resubscribes', async () => {
    const results: WatchPendingTransactionsResult = []
    let unsubscribe = watchPendingTransactions({}, (results_) =>
      results.push(...results_),
    )
    unsubscribe()

    const signers = getSigners()
    const to = signers[1]
    const toAddress = to?.account.address

    await connect({ connector: client.connectors[0]! })
    await sendTransaction({
      mode: 'recklesslyUnprepared',
      request: {
        to: toAddress,
        value: parseEther('1'),
      },
    })

    const provider = getProvider()
    await new Promise((res) =>
      setTimeout(() => res(''), provider.pollingInterval + 50),
    )

    expect(results.length).toEqual(0)

    unsubscribe = watchPendingTransactions({}, (results_) =>
      results.push(...results_),
    )

    await sendTransaction({
      mode: 'recklesslyUnprepared',
      request: {
        to: toAddress,
        value: parseEther('1'),
      },
    })

    await new Promise((res) =>
      setTimeout(() => res(''), provider.pollingInterval + 50),
    )

    expect(results.length).toEqual(1)
    unsubscribe()
  })
})
