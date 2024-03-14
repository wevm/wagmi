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
      "baseFeePerGas": 24076814055n,
      "blobGasUsed": undefined,
      "chainId": 1,
      "difficulty": 0n,
      "excessBlobGas": undefined,
      "extraData": "0x546974616e2028746974616e6275696c6465722e78797a29",
      "gasLimit": 30000000n,
      "gasUsed": 26325393n,
      "hash": "0xcfa5df46abf1521f68ae72a7f7c4661949f4fb08a3d1296fe8082f6580a414e0",
      "logsBloom": "0x2df3b5a24d2d57e7d73f96dbfea3577b1d5fbaacfcb9b5fb86db74d2e4ffd1e48bba050c33edada84fe477213937158c1e95d3da9f457f6f36e3ff0afdffcb667c5ee5f9e3ddffa9db1af6bbf15fcbbca5139717d5eedab4daa63cd8bb7dfa3e976b1e7023e2dc4586cef3caa0b73d6ff2ba3afb989c9f58f6b67bb4ed596c5aeb78cef51f69ad3675df70ffbd2aa6576d7c9e3debd00cccec3b69fc617b8568bfe588f7e126ef591f34ddd0d8b68c28b7ed45b46af3a7bb75c0e2fe4bec54fb772c87ae6f7efcdfb13139b758cfda4d98dffe426fef6d1c2e55f36b5bb1f0a2aef7bcbdf83d31ea646cf6ef3fe9d8b9af2ad4197f7ea2de462bd029fdef7e6f",
      "miner": "0x4838b106fce9647bdf1e7877bf73ce8b0bad5f97",
      "mixHash": "0x92ac9cd6e57bacd7c7d3e9b087c3907b1c085e284eec2dce7379a847cb4c9940",
      "nonce": "0x0000000000000000",
      "number": 19258213n,
      "parentHash": "0x40cb7885ad596d0397d664a4dc9ef5c2011c09e9a62b386f838f5f5362582ebb",
      "receiptsRoot": "0x910a69ba396ab4f59c2c77aa413e941fc4da97a021b8d8bbf12c125bfc42d9d3",
      "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
      "size": 158252n,
      "stateRoot": "0x6e27207d219b0251dbc2fde71f3cde8e33703261f032056453c27275500dddbc",
      "timestamp": 1708302299n,
      "totalDifficulty": 58750003716598352816469n,
      "transactionsRoot": "0x897dba26a3a940b62f86da6e5fec5f71312ad7c871a4031db79dee67442c9d1e",
      "uncles": [],
      "withdrawals": [
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
          "amount": "0x112da72",
          "index": "0x21ec946",
          "validatorIndex": "0x5cd8e",
        },
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
          "amount": "0x1119345",
          "index": "0x21ec947",
          "validatorIndex": "0x5cd8f",
        },
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
          "amount": "0x110e2ca",
          "index": "0x21ec948",
          "validatorIndex": "0x5cd90",
        },
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
          "amount": "0x1119245",
          "index": "0x21ec949",
          "validatorIndex": "0x5cd91",
        },
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
          "amount": "0x1115a03",
          "index": "0x21ec94a",
          "validatorIndex": "0x5cd92",
        },
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
          "amount": "0x111cf3f",
          "index": "0x21ec94b",
          "validatorIndex": "0x5cd93",
        },
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
          "amount": "0x1106006",
          "index": "0x21ec94c",
          "validatorIndex": "0x5cd94",
        },
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
          "amount": "0x1115bb3",
          "index": "0x21ec94d",
          "validatorIndex": "0x5cd95",
        },
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
          "amount": "0x111e0d9",
          "index": "0x21ec94e",
          "validatorIndex": "0x5cd96",
        },
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
          "amount": "0x110829f",
          "index": "0x21ec94f",
          "validatorIndex": "0x5cd97",
        },
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
          "amount": "0x11029ab",
          "index": "0x21ec950",
          "validatorIndex": "0x5cd98",
        },
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
          "amount": "0x11140a6",
          "index": "0x21ec951",
          "validatorIndex": "0x5cd99",
        },
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
          "amount": "0x111396c",
          "index": "0x21ec952",
          "validatorIndex": "0x5cd9a",
        },
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
          "amount": "0x110de16",
          "index": "0x21ec953",
          "validatorIndex": "0x5cd9b",
        },
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
          "amount": "0x1121062",
          "index": "0x21ec954",
          "validatorIndex": "0x5cd9c",
        },
        {
          "address": "0xb9d7934878b5fb9610b3fe8a5e441e8fad7e293f",
          "amount": "0x11188bc",
          "index": "0x21ec955",
          "validatorIndex": "0x5cd9d",
        },
      ],
      "withdrawalsRoot": "0x26638497bd55075025ac2362d92bd789ac1232fd50c4b3866565280318027950",
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
