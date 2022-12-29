import type { Transaction } from 'ethers'
import { parseEther } from 'ethers/lib/utils.js'
import { beforeEach, describe, expect, it } from 'vitest'

import { sendTransaction } from '.'
import { getSigners, setupClient } from '../../../test'
import type { Client } from '../../client'
import { connect } from '../accounts'
import { getProvider } from '../providers'
import { watchPendingTransactions } from './watchPendingTransactions'

describe('watchPendingTransactions', () => {
  let client: Client
  beforeEach(() => {
    client = setupClient()
  })

  it('default', async () => {
    const results: Transaction[] = []
    const unsubscribe = watchPendingTransactions({}, (tx) => results.push(tx))

    const provider = getProvider()
    await new Promise((res) =>
      setTimeout(() => res(''), provider.pollingInterval + 50),
    )

    expect(results.length).toEqual(0)
    unsubscribe()
  })

  it('new transaction', async () => {
    const results: Transaction[] = []
    const unsubscribe = watchPendingTransactions({}, (tx) => results.push(tx))

    const signers = getSigners()
    const to = signers[1]
    const toAddress = await to?.getAddress()

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
    const results: Transaction[] = []
    let unsubscribe = watchPendingTransactions({}, (tx) => results.push(tx))
    unsubscribe()

    const signers = getSigners()
    const to = signers[1]
    const toAddress = await to?.getAddress()

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

    unsubscribe = watchPendingTransactions({}, (tx) => results.push(tx))

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
