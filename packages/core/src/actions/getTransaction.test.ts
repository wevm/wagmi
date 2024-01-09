import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getTransaction } from './getTransaction.js'

test('default', async () => {
  await expect(
    getTransaction(config, {
      hash: '0xa559259bd2d0e8372421e222ff3545f705b5da60005bd787a23c2e68d6d7fefd',
    }),
  ).resolves.toMatchInlineSnapshot(`
    {
      "accessList": [],
      "blockHash": "0x61c4e868008b465addd7c0a5da03db28bb9911597c58e239a85dd14dd43fd56a",
      "blockNumber": 17488642n,
      "chainId": 1,
      "from": "0xd2135cfb216b74109775236e36d4b433f1df507b",
      "gas": 53671n,
      "gasPrice": 15806335296n,
      "hash": "0xa559259bd2d0e8372421e222ff3545f705b5da60005bd787a23c2e68d6d7fefd",
      "input": "0xa9059cbb0000000000000000000000006acbe090725d8b1cd59fe5f3e0c9c3685ebb77af00000000000000000000000000000000000000000000000000000002540be400",
      "maxFeePerGas": 19000000000n,
      "maxPriorityFeePerGas": 1000000000n,
      "nonce": 29,
      "r": "0x60a19c4a708571d2a7c661dc5494542fa2c6ddd8e7dc218e4c4795b6ba7969f5",
      "s": "0x7ef2778cc21f5c12861208d0c030e77193a234273e32a1dd5066d7d677aa1ef2",
      "to": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "transactionIndex": 58,
      "type": "eip1559",
      "typeHex": "0x2",
      "v": 1n,
      "value": 0n,
      "yParity": 1,
    }
  `)
})
