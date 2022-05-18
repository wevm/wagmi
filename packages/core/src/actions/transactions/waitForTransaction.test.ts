import { parseEther } from 'ethers/lib/utils'

import { getSigners, setupClient } from '../../../test'
import { Client } from '../../client'
import { connect } from '../accounts'
import { sendTransaction } from './sendTransaction'
import { waitForTransaction } from './waitForTransaction'

describe('waitForTransaction', () => {
  let client: Client
  beforeEach(() => {
    client = setupClient()
  })

  describe('args', () => {
    it('chainId', async () => {
      await connect({ connector: client.connectors[0] })

      const signers = getSigners()
      const to = signers[1]
      const toAddress = await to.getAddress()
      const fromAddress = client.data?.account

      const result = await sendTransaction({
        request: {
          from: fromAddress,
          to: toAddress,
          value: parseEther('1'),
        },
      })
      expect(result.hash).toBeDefined()
      const receipt = await waitForTransaction({
        chainId: 1,
        hash: result.hash,
      })
      expect(receipt.transactionHash).toEqual(result.hash)
    })

    it('hash', async () => {
      await connect({ connector: client.connectors[0] })

      const signers = getSigners()
      const to = signers[1]
      const toAddress = await to.getAddress()
      const fromAddress = client.data?.account

      const result = await sendTransaction({
        request: {
          from: fromAddress,
          to: toAddress,
          value: parseEther('1'),
        },
      })
      expect(result.hash).toBeDefined()
      const receipt = await waitForTransaction({
        hash: result.hash,
      })
      expect(receipt.transactionHash).toEqual(result.hash)
    })
  })
})
