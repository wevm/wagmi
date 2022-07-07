import { BigNumber } from 'ethers/lib/ethers'
import { parseEther } from 'ethers/lib/utils'

import { getSigners, setupClient } from '../../../test'
import { Client } from '../../client'
import { connect } from '../accounts'
import { prepareTransaction } from './prepareTransaction'
import { sendTransactionPrepared } from './sendTransactionPrepared'

describe('sendTransactionPrepared', () => {
  let client: Client
  beforeEach(() => {
    client = setupClient()
  })

  describe('args', () => {
    it('request', async () => {
      await connect({ connector: client.connectors[0]! })

      const signers = getSigners()
      const to = signers[1]
      const toAddress = await to?.getAddress()

      const preparedRequest = await prepareTransaction({
        request: {
          to: toAddress as string,
          value: parseEther('10'),
        },
      })
      const { blockNumber, hash, gasLimit, gasPrice } =
        await sendTransactionPrepared({
          preparedRequest,
        })
      expect(blockNumber).toBeDefined()
      expect(hash).toBeDefined()
      expect(gasPrice).toBeDefined()
      expect(gasLimit).toMatchInlineSnapshot(`
        {
          "hex": "0x5209",
          "type": "BigNumber",
        }
      `)
    })
  })

  describe('behavior', () => {
    it('fails on insufficient balance', async () => {
      await connect({ connector: client.connectors[0]! })

      const preparedRequest = await prepareTransaction({
        request: {
          to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
          value: BigNumber.from('10000000000000000000000'), // 100,000 ETH
        },
      })

      try {
        await sendTransactionPrepared({
          preparedRequest,
        })
      } catch (error) {
        expect((<Error>error).message).toContain(
          "sender doesn't have enough funds to send tx",
        )
      }
    })
  })
})
