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
      "baseFeePerGas": 31986155981n,
      "chainId": 1,
      "difficulty": 0n,
      "extraData": "0x626f62612d6275696c6465722e636f6d",
      "gasLimit": 30000000n,
      "gasUsed": 10413493n,
      "hash": "0x03a96587556ab955c3456f809368bd2f7a190964ff00962a586c246ef39c93f5",
      "logsBloom": "0x103141420cb0c3103b2013128c89300b12070c417c06810cb009102443524b02702dc1c8089006080a033bc3188495060a118242c82168030200df2948aa01012642d68a49a38e292d07413a880909a2c92000195064ce8415359412ec2023a07e5205000a14082182ce6488182a2ac3251064338499dea8420d0cba774aa221277307500c8298b1485c8879824250005040102d810018fb4e20684208126880e2a1894019916814234244c008b20ca004110e88004090282c640e0e1002036011d20002c25012140031708209ff008048c0c2ea80e04a166a1fe30a8203b10021f0600810810180180520a08e215aa88f043430e24841401419101c2440164b",
      "miner": "0x3b64216ad1a58f61538b4fa1b27327675ab7ed67",
      "mixHash": "0xdac10159cb5c8251f8ca656d74c5c32c08ef13b10cabc8bb09908a404d52eecf",
      "nonce": "0x0000000000000000",
      "number": 18677381n,
      "parentHash": "0x26b6b1583f45019f38f62a3bfa026e2b3213d92a3996a527d23554d5d71e29fd",
      "receiptsRoot": "0xc4d6b5c42258d5a6861e25e99f2929bb8a7456d52ac6e6a96e5c3bcd8bfe2e0a",
      "sealFields": [],
      "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
      "size": 141249n,
      "stateRoot": "0x01cb576afed4f3f56c86529507ed9951b2849d8895c02fa9a35ab7771695b26c",
      "timestamp": 1701262235n,
      "totalDifficulty": 58750003716598352816469n,
      "transactionsRoot": "0xd99b2a58709a3690d962f9cb8d6b941455143c5fe24fc5540bd6ff4d06e6d7ea",
      "uncles": [],
      "withdrawals": [
        {
          "address": "0xf20b338752976878754518183873602902360704",
          "amount": "0x1053ffc",
          "index": "0x190fb46",
          "validatorIndex": "0xf3ab6",
        },
        {
          "address": "0xf20b338752976878754518183873602902360704",
          "amount": "0x103ec51",
          "index": "0x190fb47",
          "validatorIndex": "0xf3ab7",
        },
        {
          "address": "0xf20b338752976878754518183873602902360704",
          "amount": "0x1052bbc",
          "index": "0x190fb48",
          "validatorIndex": "0xf3ab8",
        },
        {
          "address": "0xf20b338752976878754518183873602902360704",
          "amount": "0x1041aee",
          "index": "0x190fb49",
          "validatorIndex": "0xf3ab9",
        },
        {
          "address": "0xf20b338752976878754518183873602902360704",
          "amount": "0x104e073",
          "index": "0x190fb4a",
          "validatorIndex": "0xf3aba",
        },
        {
          "address": "0xf20b338752976878754518183873602902360704",
          "amount": "0x10480de",
          "index": "0x190fb4b",
          "validatorIndex": "0xf3abb",
        },
        {
          "address": "0xf20b338752976878754518183873602902360704",
          "amount": "0x104ab57",
          "index": "0x190fb4c",
          "validatorIndex": "0xf3abc",
        },
        {
          "address": "0xf20b338752976878754518183873602902360704",
          "amount": "0x383fece",
          "index": "0x190fb4d",
          "validatorIndex": "0xf3abd",
        },
        {
          "address": "0xf20b338752976878754518183873602902360704",
          "amount": "0x1057082",
          "index": "0x190fb4e",
          "validatorIndex": "0xf3abe",
        },
        {
          "address": "0xf20b338752976878754518183873602902360704",
          "amount": "0x1048c65",
          "index": "0x190fb4f",
          "validatorIndex": "0xf3abf",
        },
        {
          "address": "0xf20b338752976878754518183873602902360704",
          "amount": "0x10405de",
          "index": "0x190fb50",
          "validatorIndex": "0xf3ac0",
        },
        {
          "address": "0xf20b338752976878754518183873602902360704",
          "amount": "0x105e565",
          "index": "0x190fb51",
          "validatorIndex": "0xf3ac1",
        },
        {
          "address": "0xf20b338752976878754518183873602902360704",
          "amount": "0x1041e0e",
          "index": "0x190fb52",
          "validatorIndex": "0xf3ac2",
        },
        {
          "address": "0xf20b338752976878754518183873602902360704",
          "amount": "0x1048d6e",
          "index": "0x190fb53",
          "validatorIndex": "0xf3ac3",
        },
        {
          "address": "0xf20b338752976878754518183873602902360704",
          "amount": "0x104db30",
          "index": "0x190fb54",
          "validatorIndex": "0xf3ac4",
        },
        {
          "address": "0xf20b338752976878754518183873602902360704",
          "amount": "0x10421f6",
          "index": "0x190fb55",
          "validatorIndex": "0xf3ac5",
        },
      ],
      "withdrawalsRoot": "0xd67d00f01ac780dd7292e464f0873611c0b9cfaf7d630400ed04abf312cb53f4",
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
