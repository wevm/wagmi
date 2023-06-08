import { parseEther } from 'viem'
import { beforeEach, describe, expect, it } from 'vitest'

import { getWalletClients, setupConfig } from '../../../test'
import type { Config } from '../../config'
import { connect } from '../accounts'
import { prepareSendTransaction } from './prepareSendTransaction'
import { sendTransaction } from './sendTransaction'

describe('sendTransaction', () => {
  let config: Config
  beforeEach(() => {
    config = setupConfig()
  })

  describe('args', () => {
    it('"prepared" request', async () => {
      await connect({ connector: config.connectors[0]! })

      const request = await prepareSendTransaction({
        to: 'jxom.eth',
        value: parseEther('10'),
      })
      const { hash } = await sendTransaction(request)
      expect(hash).toBeDefined()
    })

    it('"unprepared" request', async () => {
      await connect({ connector: config.connectors[0]! })

      const { hash } = await sendTransaction({
        to: 'jxom.eth',
        value: parseEther('10'),
      })
      expect(hash).toBeDefined()
    })
  })

  describe('errors', () => {
    it('wallet is on different chain', async () => {
      await connect({ connector: config.connectors[0]! })

      const walletClients = getWalletClients()
      const to = walletClients[1]
      const toAddress = to?.account.address || ''

      const request = await prepareSendTransaction({
        to: toAddress,
        value: parseEther('10'),
      })

      expect(() =>
        sendTransaction({
          chainId: 420,
          ...request,
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Chain mismatch: Expected \\"Chain 420\\", received \\"Ethereum\\"."`,
      )
    })

    it('insufficient balance', async () => {
      await connect({ connector: config.connectors[0]! })

      const request = await prepareSendTransaction({
        to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
        value: parseEther('100000'),
      })

      await expect(() =>
        sendTransaction(request),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
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
          gas:    21000

        Details: Insufficient funds for gas * price + value
        Version: viem@1.0.0"
      `)
    })
  })
})
