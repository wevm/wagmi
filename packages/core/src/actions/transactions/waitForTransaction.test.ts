import { parseEther } from 'viem'
import { beforeEach, describe, expect, it } from 'vitest'

import { getWalletClients, setupClient } from '../../../test'
import type { Client } from '../../client'
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
      await connect({ connector: client.connectors[0]! })

      const walletClients = getWalletClients()
      const to = walletClients[1]
      const toAddress = to?.account.address

      const result = await sendTransaction({
        request: {
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
      await connect({ connector: client.connectors[0]! })

      const walletClients = getWalletClients()
      const to = walletClients[1]
      const toAddress = to?.account.address

      const result = await sendTransaction({
        request: {
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

  describe('behavior', () => {
    it('reverts', async () => {
      await expect(
        waitForTransaction({
          // https://etherscan.io/tx/0x227025716535219d4c3737172c9c1507475e7a3246c8efcdc050ac59ed40b68e
          hash: '0x227025716535219d4c3737172c9c1507475e7a3246c8efcdc050ac59ed40b68e',
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `
        "An internal error was received.

        URL: http://127.0.0.1:8545
        Request body: {\\"method\\":\\"eth_call\\",\\"params\\":[{\\"gas\\":\\"0xb4bb\\",\\"gasPrice\\":\\"0x89d5f3200\\",\\"nonce\\":\\"0x3\\",\\"to\\":\\"0x283af0b28c62c092c9727f1ee09c02ca627eb7f5\\",\\"value\\":\\"0x0\\"},\\"0xbeea0b\\"]}
         
        Raw Call Arguments:
          to:        0x283af0b28c62c092c9727f1ee09c02ca627eb7f5
          value:     0 ETH
          gas:       46267
          gasPrice:  37 gwei
          nonce:     3

        Details: Fork Error: JsonRpcClientError(JsonRpcError(JsonRpcError { code: -32000, message: \\"execution reverted\\", data: None }))
        Version: viem@0.3.12"
      `,
      )
    })
  })
})
