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
      "baseFeePerGas": 17067757687n,
      "difficulty": 0n,
      "extraData": "0x7273796e632d6275696c6465722e78797a",
      "gasLimit": 30000000n,
      "gasUsed": 12943197n,
      "hash": "0x8788234b8374b69dcac0493c79e2de0d709baa6c44ae76296b86c772448321f9",
      "logsBloom": "0x99e0801001001d20130c70d6c71123a6721962daac346e1540afcc221e0a1d1316200220e988431d3704ba3ca43493010b2ba1b00c8330080a74d2f1b677a96027d5e1d1cc184e2979c130cec07e9c2832b5226044e5b682530c9dd990900a2b8b055e4176266c23bac4981e5d02c9d1dc19147d24b92c02de400fdc70bc59c803a29196122c133a1150280406a21b98e45210312b61d03b89460270491f2f138f488de9cb8267216bd450ee252c8d008206824125af436e09243f5416a922d085041013b4cc280026086c82024f6f037dd861311479001f531120aa182265621410fe1988bf1c41a615dba1330ddc2185503250501d2e40045c9f66b1ea2963",
      "miner": "0x1f9090aae28b8a3dceadf281b0f12828e676c326",
      "mixHash": "0xf8ebc13c90a222c830da0ded5aec7ec16c719ebd77812fd7dfcc50f7af9b7195",
      "nonce": "0x0000000000000000",
      "number": 16966590n,
      "parentHash": "0x206b43a65b6ce96ccc9eed05b96491434252e2d81444b8f4657b7635ae279c65",
      "receiptsRoot": "0x84f9b21e677a16ba4d6c5e68bbc45f5afe413db665f4a85f5a67c03e29530d21",
      "sealFields": [],
      "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
      "size": 153473n,
      "stateRoot": "0x5567b503d65e33001aa45e88b63ffed673b898889b7af7c7a821ddbe327a53dc",
      "timestamp": 1680501575n,
      "totalDifficulty": 58750003716598352816469n,
      "transactionsRoot": "0x39ea49af8b149c8049644cd4f2f1de5ec93862a302fe4f8c10b2cc8e95cf4016",
      "uncles": [],
    }
  `)
})

test('args: includeTransactions', async () => {
  const { transactions } = await getBlock(config, {
    includeTransactions: true,
  })
  expect(transactions).toMatchObject(
    expect.arrayContaining([expect.any(Object)]),
  )
})
