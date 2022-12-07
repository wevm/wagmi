import { parseEther } from 'ethers/lib/utils.js'
import { beforeEach, describe, expect, it } from 'vitest'

import { getSigners, setupClient } from '../../../test'
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

      const signers = getSigners()
      const to = signers[1]
      const toAddress = await to?.getAddress()
      const fromAddress = client.data?.account

      const result = await sendTransaction({
        mode: 'recklesslyUnprepared',
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
      await connect({ connector: client.connectors[0]! })

      const signers = getSigners()
      const to = signers[1]
      const toAddress = await to?.getAddress()
      const fromAddress = client.data?.account

      const result = await sendTransaction({
        mode: 'recklesslyUnprepared',
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

  describe('behavior', () => {
    it('reverts', async () => {
      await expect(
        waitForTransaction({
          // https://etherscan.io/tx/0x227025716535219d4c3737172c9c1507475e7a3246c8efcdc050ac59ed40b68e
          hash: '0x227025716535219d4c3737172c9c1507475e7a3246c8efcdc050ac59ed40b68e',
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        '"missing revert data in call exception; Transaction reverted without a reason string [ See: https://links.ethers.org/v5-errors-CALL_EXCEPTION ] (data=\\"0x\\", transaction={\\"from\\":\\"0xA0Cf798816D4b9b9866b5330EEa46a18382f251e\\",\\"to\\":\\"0x283Af0B28c62C092C9727F1Ee09c02CA627EB7F5\\",\\"type\\":0,\\"accessList\\":null}, error={\\"reason\\":\\"processing response error\\",\\"code\\":\\"SERVER_ERROR\\",\\"body\\":\\"{\\\\\\"jsonrpc\\\\\\":\\\\\\"2.0\\\\\\",\\\\\\"id\\\\\\":47,\\\\\\"error\\\\\\":{\\\\\\"code\\\\\\":-32603,\\\\\\"message\\\\\\":\\\\\\"Fork Error: JsonRpcClientError(JsonRpcError(JsonRpcError { code: -32000, message: \\\\\\\\\\\\\\"execution reverted\\\\\\\\\\\\\\", data: None }))\\\\\\"}}\\",\\"error\\":{\\"code\\":-32603},\\"requestBody\\":\\"{\\\\\\"method\\\\\\":\\\\\\"eth_call\\\\\\",\\\\\\"params\\\\\\":[{\\\\\\"type\\\\\\":\\\\\\"0x0\\\\\\",\\\\\\"from\\\\\\":\\\\\\"0xa0cf798816d4b9b9866b5330eea46a18382f251e\\\\\\",\\\\\\"to\\\\\\":\\\\\\"0x283af0b28c62c092c9727f1ee09c02ca627eb7f5\\\\\\"},\\\\\\"0xbeea0b\\\\\\"],\\\\\\"id\\\\\\":47,\\\\\\"jsonrpc\\\\\\":\\\\\\"2.0\\\\\\"}\\",\\"requestMethod\\":\\"POST\\",\\"url\\":\\"http://127.0.0.1:8545\\"}, code=CALL_EXCEPTION, version=providers/5.7.1)"',
      )
    })
  })
})
