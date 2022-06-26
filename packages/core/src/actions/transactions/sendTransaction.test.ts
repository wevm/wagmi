import { BigNumber } from 'ethers/lib/ethers'
import { parseEther } from 'ethers/lib/utils'

import { getSigners, setupClient } from '../../../test'
import { Client } from '../../client'
import { MockConnector } from '../../connectors/mock'
import { connect } from '../accounts'
import { sendTransaction } from './sendTransaction'

describe('sendTransaction', () => {
  let client: Client
  beforeEach(() => {
    client = setupClient()
  })

  describe('args', () => {
    describe('chainId', () => {
      it('switches before sending transaction', async () => {
        await connect({ connector: client.connectors[0]! })

        const signers = getSigners()
        const to = signers[1]
        const toAddress = await to?.getAddress()
        const fromAddress = client.data?.account

        const result = await sendTransaction({
          chainId: 1,
          request: {
            from: fromAddress,
            to: toAddress,
            value: parseEther('10'),
          },
        })
        expect(result.hash).toBeDefined()
      })

      it('unable to switch', async () => {
        await connect({
          connector: new MockConnector({
            options: {
              flags: { noSwitchChain: true },
              signer: getSigners()[0]!,
            },
          }),
        })

        const signers = getSigners()
        const to = signers[1]
        const toAddress = await to?.getAddress()
        const fromAddress = client.data?.account

        await expect(
          sendTransaction({
            chainId: 10,
            request: {
              from: fromAddress,
              to: toAddress,
              value: parseEther('10'),
            },
          }),
        ).rejects.toThrowErrorMatchingInlineSnapshot(
          `"Chain mismatch: Expected \\"Chain 10\\", received \\"Ethereum."`,
        )
      })
    })

    it('request', async () => {
      await connect({ connector: client.connectors[0]! })

      const signers = getSigners()
      const to = signers[1]
      const toAddress = await to?.getAddress()
      const fromAddress = client.data?.account

      const result = await sendTransaction({
        request: {
          from: fromAddress,
          to: toAddress,
          value: parseEther('10'),
        },
      })
      expect(result.hash).toBeDefined()
    })
  })

  describe('behavior', () => {
    it('throws', async () => {
      await expect(
        sendTransaction({
          request: {},
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"Connector not found"`)
    })

    it('fails on insufficient balance', async () => {
      await connect({ connector: client.connectors[0]! })

      try {
        await sendTransaction({
          request: {
            to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
            value: BigNumber.from('10000000000000000000000'), // 100,000 ETH
          },
        })
      } catch (error) {
        expect((<Error>error).message).toContain(
          "sender doesn't have enough funds to send tx",
        )
      }
    })
  })
})
