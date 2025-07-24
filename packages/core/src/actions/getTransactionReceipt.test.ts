import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getTransaction } from './getTransaction.js'
import { getTransactionReceipt } from './getTransactionReceipt.js'

test('default', async () => {
  const transaction = await getTransaction(config, {
    blockNumber: 16280769n,
    index: 0,
  })

  await expect(
    getTransactionReceipt(config, {
      hash: transaction.hash,
    }),
  ).resolves.toMatchInlineSnapshot(`
    {
      "blockHash": "0xb932f77cf770d1d1c8f861153eec1e990f5d56b6ffdb4ac06aef3cca51ef37d4",
      "blockNumber": 16280769n,
      "contractAddress": null,
      "cumulativeGasUsed": 21000n,
      "effectiveGasPrice": 33427926161n,
      "from": "0x043022ef9fca1066024d19d681e2ccf44ff90de3",
      "gasUsed": 21000n,
      "logs": [],
      "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      "status": "success",
      "to": "0x318a5fb4f1604fc46375a1db9a9018b6e423b345",
      "transactionHash": "0xbf7d27700d053765c9638d3b9d39eb3c56bfc48377583e8be483d61f9f18a871",
      "transactionIndex": 0,
      "type": "legacy",
    }
  `)
})
