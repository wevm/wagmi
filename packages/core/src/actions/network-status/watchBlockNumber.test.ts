import { parseEther } from 'viem'
import { beforeEach, describe, expect, it } from 'vitest'

import { getWalletClients, setupConfig } from '../../../test'
import type { Config } from '../../config'
import { connect } from '../accounts'
import { sendTransaction } from '../transactions'
import { getPublicClient } from '../viem'
import { watchBlockNumber } from './watchBlockNumber'

describe('watchBlockNumber', () => {
  let config: Config
  beforeEach(() => {
    config = setupConfig()
  })

  it('default', async () => {
    const results: bigint[] = []
    const unsubscribe = watchBlockNumber(
      {
        listen: false,
      },
      (blockNumber) => results.push(blockNumber),
    )

    const publicClient = getPublicClient()
    await new Promise((res) =>
      setTimeout(() => res(''), publicClient.pollingInterval + 50),
    )

    expect(results.length).toEqual(0)
    unsubscribe()
  })

  describe('args', () => {
    describe('listen', () => {
      it(
        'default',
        async () => {
          const results: bigint[] = []
          const unsubscribe = watchBlockNumber(
            {
              listen: true,
            },
            (blockNumber) => results.push(blockNumber),
          )

          const publicClient = getPublicClient()
          await new Promise((res) =>
            setTimeout(() => res(''), publicClient.pollingInterval + 50),
          )

          expect(results.length).toEqual(1)
          unsubscribe()
        },
        { retry: 3 },
      )

      it('new block', async () => {
        const results: bigint[] = []
        const unsubscribe = watchBlockNumber(
          {
            listen: true,
          },
          (blockNumber) => results.push(blockNumber),
        )

        const walletClients = getWalletClients()
        const to = walletClients[1]
        const toAddress = to?.account.address

        await connect({ connector: config.connectors[0]! })
        await sendTransaction({
          to: toAddress!,
          value: parseEther('1'),
        })

        const publicClient = getPublicClient()
        await new Promise((res) =>
          setTimeout(() => res(''), publicClient.pollingInterval + 50),
        )

        expect(results.length).toEqual(2)
        expect(results[results.length - 1]! > results[0]!).toBeTruthy()
        unsubscribe()
      })

      it('unsubscribes + resubscribes', async () => {
        const results: bigint[] = []
        let unsubscribe = watchBlockNumber(
          {
            listen: true,
          },
          (blockNumber) => results.push(blockNumber),
        )
        unsubscribe()

        const walletClients = getWalletClients()
        const to = walletClients[1]
        const toAddress = to?.account.address

        await connect({ connector: config.connectors[0]! })
        await sendTransaction({
          to: toAddress!,
          value: parseEther('1'),
        })

        const publicClient = getPublicClient()
        await new Promise((res) =>
          setTimeout(() => res(''), publicClient.pollingInterval + 50),
        )

        expect(results.length).toEqual(0)

        unsubscribe = watchBlockNumber(
          {
            listen: true,
          },
          (blockNumber) => results.push(blockNumber),
        )

        await sendTransaction({
          to: toAddress!,
          value: parseEther('1'),
        })

        await new Promise((res) => setTimeout(() => res(''), 100))

        expect(results.length).toEqual(1)

        unsubscribe()
      })
    })
  })
})
