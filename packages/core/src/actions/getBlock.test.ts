import { config, mainnet } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getBlock } from './getBlock.js'

test('default', async () => {
  await expect(getBlock(config)).resolves.toBeDefined()
})

test('args: blockNumber', async () => {
  const { transactions, ...block } = await getBlock(config, {
    blockNumber: mainnet.fork.blockNumber,
  })
  expect(transactions).toMatchObject(
    expect.arrayContaining([expect.any(String)]),
  )
  expect(block).toMatchInlineSnapshot(`
    {
      "baseFeePerGas": 194923488n,
      "blobGasUsed": 786432n,
      "chainId": 1,
      "difficulty": 0n,
      "excessBlobGas": 0n,
      "extraData": "0x546974616e2028746974616e6275696c6465722e78797a29",
      "gasLimit": 45000000n,
      "gasUsed": 30531630n,
      "hash": "0xe38d4bb2060a54519508612f40ef737a09c5b20488c12b0bec2d4f5ea7073c15",
      "logsBloom": "0x3effc77fb16497fa74fffeb6ef65dfbd7b97f8dd7f198ff37abfcf5fdeb329e7bdbc9d8caffdf765f7b75df9e737eff773fbf639ff9ffb376fb726a7ff2f68dffea0de7fafd3f7fbff8d5fdff57becf3e76f3f73fefc1ff9bbf9df7fb3fffff13f577b7fdffeb7f7ffb8cd71ff93fff3bfffd7e3bfbe576daefdfff6fb5afedf8ffbbd7d7baf977f46fbffceebfbe86fc6ffb6f1eff3fbbfbeb9eefbf954ffe3fbff9d73b8f9ecfdcfdf7df3fdd9ff3bbfdfe9efe8ffee6ff7fe4a3ff7a5fefbfffffcffcd7f2bc04bdf7c52d3fdfeff3f7dfe7b4fefa9f46edb53c2de9ffb7f3ffdff6fefa67f64f6e7f7bff5af1dffffeff9b99ff86fef589e3bbfffdfffb7",
      "miner": "0x4838b106fce9647bdf1e7877bf73ce8b0bad5f97",
      "mixHash": "0x15350a0cad9bc5cb1298b3710db038850f1df5d8ac00c4ca3b03fb64c7e8ab78",
      "nonce": "0x0000000000000000",
      "number": 23535880n,
      "parentBeaconBlockRoot": "0x2bd55d2f0e1a3d3e181659ebc21bb167527e517de88b39b0d7ebbeeb3e28eebc",
      "parentHash": "0x1fab238a9630a2e95c8b735ebc63bc2751bc6492f409ee16a7b5a532985196eb",
      "receiptsRoot": "0x01d0a60dd8fd8de710a191aba91f82e2a437ac21a6e77b21b2f745809e7feadf",
      "requestsHash": "0x965c860907968cab126093a785436ad747495ae45b21dac1b6a92ae0f4866ce0",
      "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
      "size": 155442n,
      "stateRoot": "0xd3c86549e5d57f14bd0b28630b70cb68038ac3334251bd194c93a18d96492f39",
      "timestamp": 1759960991n,
      "totalDifficulty": null,
      "transactionsRoot": "0x9da0226f723a9da4b8df8782930c0e83bd73c4a393069ee7861465188eed989b",
      "uncles": [],
      "withdrawals": [
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
          "amount": "0x11a6bd6",
          "index": "0x633236b",
          "validatorIndex": "0xb8688",
        },
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
          "amount": "0x119ebba",
          "index": "0x633236c",
          "validatorIndex": "0xb8689",
        },
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
          "amount": "0x11a167c",
          "index": "0x633236d",
          "validatorIndex": "0xb868a",
        },
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
          "amount": "0x11a2017",
          "index": "0x633236e",
          "validatorIndex": "0xb868b",
        },
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
          "amount": "0x11a5b81",
          "index": "0x633236f",
          "validatorIndex": "0xb868c",
        },
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
          "amount": "0x11a4908",
          "index": "0x6332370",
          "validatorIndex": "0xb868d",
        },
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
          "amount": "0x11a74ca",
          "index": "0x6332371",
          "validatorIndex": "0xb868e",
        },
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
          "amount": "0x11a5a90",
          "index": "0x6332372",
          "validatorIndex": "0xb868f",
        },
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
          "amount": "0x11a512b",
          "index": "0x6332373",
          "validatorIndex": "0xb8690",
        },
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
          "amount": "0x11a0ba7",
          "index": "0x6332374",
          "validatorIndex": "0xb8691",
        },
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
          "amount": "0x11a313b",
          "index": "0x6332375",
          "validatorIndex": "0xb8692",
        },
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
          "amount": "0x3e72765",
          "index": "0x6332376",
          "validatorIndex": "0xb8693",
        },
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
          "amount": "0x119c821",
          "index": "0x6332377",
          "validatorIndex": "0xb8694",
        },
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
          "amount": "0x119e921",
          "index": "0x6332378",
          "validatorIndex": "0xb8695",
        },
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
          "amount": "0x119f302",
          "index": "0x6332379",
          "validatorIndex": "0xb8696",
        },
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
          "amount": "0x11a38a8",
          "index": "0x633237a",
          "validatorIndex": "0xb8697",
        },
      ],
      "withdrawalsRoot": "0x0740ba007069960b2d60f77b0ce2648cffa3573accd055d4803eb771e32903e7",
    }
  `)
})

test('args: includeTransactions', async () => {
  const { transactions } = await getBlock(config, {
    includeTransactions: true,
    blockNumber: mainnet.fork.blockNumber,
  })
  expect(transactions).toMatchObject(
    expect.arrayContaining([expect.any(Object)]),
  )
})
