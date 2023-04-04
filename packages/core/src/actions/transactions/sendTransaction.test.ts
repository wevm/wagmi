import { parseEther } from 'viem'
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

      const config = await prepareSendTransaction({
        request: {
          to: 'jxom.eth',
          value: parseEther('10'),
        },
      })
      const { hash } = await sendTransaction(config)
      expect(hash).toBeDefined()
    })

    it('"recklessly unprepared" request', async () => {
      await connect({ connector: client.connectors[0]! })

      const { hash } = await sendTransaction({
        mode: 'recklesslyUnprepared',
        request: {
          to: 'jxom.eth',
          value: parseEther('10'),
        },
      })
      expect(hash).toBeDefined()
    })
  })

  describe('errors', () => {
    it('signer is on different chain', async () => {
      await connect({ connector: client.connectors[0]! })

      const signers = getSigners()
      const to = signers[1]
      const toAddress = to?.account.address || ''

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
      const toAddress = to?.account.address || ''

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
          value: parseEther('100000'),
        },
      })

      await expect(() => sendTransaction(config)).rejects
        .toThrowErrorMatchingInlineSnapshot(`
        "The total cost (gas * gas fee + value) of executing this transaction exceeds the balance of the account.

        This error could arise when the account does not have enough funds to:
         - pay for the total gas fee,
         - pay for the value to send.
         
        The cost of the transaction is calculated as \`gas * gas fee + value\`, where:
         - \`gas\` is the amount of gas needed for transaction to execute,
         - \`gas fee\` is the gas fee,
         - \`value\` is the amount of ether to send to the recipient.
         
        Request Arguments:
          from:   0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
          to:     0x70997970C51812dc3A010C7d01b50e0d17dc79C8
          value:  100000 ETH

        Details: Insufficient funds for gas * price + value
        Version: viem@0.2.1"
      `)
    })
  })
})
