import { BigNumber } from 'ethers'
import { parseEther } from 'ethers/lib/utils.js'
import { beforeEach, describe, expect, it } from 'vitest'

import { getSigners, setupClient } from '../../../test'
import type { Client } from '../../client'
import { connect } from '../accounts'
import { prepareSendTransaction } from './prepareSendTransaction'
import { sendTransaction } from './sendTransaction'

describe('sendTransaction', () => {
  let client: Client
  beforeEach(() => {
    client = setupClient()
  })

  describe('args', () => {
    it('"prepared" request', async () => {
      await connect({ connector: client.connectors[0]! })

      const signers = getSigners()
      const to = signers[1]
      const toAddress = await to?.getAddress()

      const config = await prepareSendTransaction({
        request: {
          to: toAddress as string,
          value: parseEther('10'),
        },
      })
      const { hash, wait } = await sendTransaction({
        ...config,
      })
      expect(hash).toBeDefined()
      expect(await wait()).toBeDefined()
    })

    it('"recklessly unprepared" request', async () => {
      await connect({ connector: client.connectors[0]! })

      const signers = getSigners()
      const to = signers[1]
      const toAddress = await to?.getAddress()

      const { hash, wait } = await sendTransaction({
        mode: 'recklesslyUnprepared',
        request: {
          to: toAddress as string,
          value: parseEther('10'),
        },
      })
      expect(hash).toBeDefined()
      expect(await wait()).toBeDefined()
    })
  })

  describe('errors', () => {
    it('signer is on different chain', async () => {
      await connect({ connector: client.connectors[0]! })

      const signers = getSigners()
      const to = signers[1]
      const toAddress = (await to?.getAddress()) || ''

      const config = await prepareSendTransaction({
        request: {
          to: toAddress,
          value: parseEther('10'),
        },
      })

      expect(() =>
        sendTransaction({
          chainId: 420,
          ...config,
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Chain mismatch: Expected \\"Chain 420\\", received \\"Ethereum\\"."`,
      )
    })

    it('chain not configured for connector', async () => {
      await connect({ connector: client.connectors[0]!, chainId: 420 })

      const signers = getSigners()
      const to = signers[1]
      const toAddress = (await to?.getAddress()) || ''

      const config = await prepareSendTransaction({
        request: {
          to: toAddress,
          value: parseEther('10'),
        },
      })

      expect(() =>
        sendTransaction({
          chainId: 420,
          ...config,
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        '"Chain \\"420\\" not configured for connector \\"mock\\"."',
      )
    })

    it('insufficient balance', async () => {
      await connect({ connector: client.connectors[0]! })

      const config = await prepareSendTransaction({
        request: {
          to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
          value: BigNumber.from('10000000000000000000000'), // 100,000 ETH
        },
      })

      try {
        await sendTransaction({
          ...config,
        })
      } catch (error) {
        expect((error as Error).message).toContain(
          'insufficient funds for intrinsic transaction cost',
        )
      }
    })

    it('`to` undefined', async () => {
      await connect({ connector: client.connectors[0]! })

      const config = await prepareSendTransaction({
        request: {
          to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
          value: parseEther('10'),
        },
      })

      expect(() =>
        // @ts-expect-error – testing for JS consumers
        sendTransaction({
          ...config,
          request: {
            ...config.request,
            to: undefined,
          },
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"\`to\` is required"`)
    })

    it('`gasLimit` undefined', async () => {
      await connect({ connector: client.connectors[0]! })

      const config = await prepareSendTransaction({
        request: {
          to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
          value: parseEther('10'),
        },
      })

      expect(() =>
        // @ts-expect-error - testing for JS consumers
        sendTransaction({
          ...config,
          request: {
            ...config.request,
            gasLimit: undefined,
          },
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"\`gasLimit\` is required"`)
    })
  })
})
