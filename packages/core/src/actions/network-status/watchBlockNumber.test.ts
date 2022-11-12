import { parseEther } from 'ethers/lib/utils.js'
import { beforeEach, describe, expect, it } from 'vitest'

import { getSigners, setupClient } from '../../../test'
import type { Client } from '../../client'
import { connect } from '../accounts'
import { getProvider } from '../providers'
import { sendTransaction } from '../transactions'
import { watchBlockNumber } from './watchBlockNumber'

describe('watchBlockNumber', () => {
  let client: Client
  beforeEach(() => {
    client = setupClient()
  })

  it('default', async () => {
    const results: number[] = []
    const unsubscribe = watchBlockNumber(
      {
        listen: false,
      },
      (blockNumber) => results.push(blockNumber),
    )

    const provider = getProvider()
    await new Promise((res) =>
      setTimeout(() => res(''), provider.pollingInterval + 50),
    )

    expect(results.length).toEqual(0)
    unsubscribe()
  })

  describe('args', () => {
    describe('listen', () => {
      it('default', async () => {
        const results: number[] = []
        const unsubscribe = watchBlockNumber(
          {
            listen: true,
          },
          (blockNumber) => results.push(blockNumber),
        )

        const provider = getProvider()
        await new Promise((res) =>
          setTimeout(() => res(''), provider.pollingInterval + 50),
        )

        expect(results.length).toEqual(1)
        unsubscribe()
      })

      it('new block', async () => {
        const results: number[] = []
        const unsubscribe = watchBlockNumber(
          {
            listen: true,
          },
          (blockNumber) => results.push(blockNumber),
        )

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

        expect(results.length).toEqual(4)
        expect(results[results.length - 1]! > results[0]!).toBeTruthy()
        unsubscribe()
      })

      it('unsubscribes + resubscribes', async () => {
        const results: number[] = []
        let unsubscribe = watchBlockNumber(
          {
            listen: true,
          },
          (blockNumber) => results.push(blockNumber),
        )
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

        unsubscribe = watchBlockNumber(
          {
            listen: true,
          },
          (blockNumber) => results.push(blockNumber),
        )

        await sendTransaction({
          mode: 'recklesslyUnprepared',
          request: {
            to: toAddress,
            value: parseEther('1'),
          },
        })

        await new Promise((res) => setTimeout(() => res(''), 100))

        expect(results.length).toEqual(1)

        unsubscribe()
      })
    })
  })
})
