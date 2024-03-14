import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getToken } from './getToken.js'

test('default', async () => {
  await expect(
    getToken(config, {
      address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    }),
  ).resolves.toMatchInlineSnapshot(`
    {
      "address": "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
      "decimals": 18,
      "name": "Uniswap",
      "symbol": "UNI",
      "totalSupply": {
        "formatted": "1000000000",
        "value": 1000000000000000000000000000n,
      },
    }
  `)
})

test('parameters: formatUnits', async () => {
  await expect(
    getToken(config, {
      address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
      formatUnits: 'gwei',
    }),
  ).resolves.toMatchInlineSnapshot(`
    {
      "address": "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
      "decimals": 18,
      "name": "Uniswap",
      "symbol": "UNI",
      "totalSupply": {
        "formatted": "1000000000000000000",
        "value": 1000000000000000000000000000n,
      },
    }
  `)
})

test('behavior: bytes32 token', async () => {
  await expect(
    getToken(config, {
      address: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
    }),
  ).resolves.toMatchInlineSnapshot(`
    {
      "address": "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
      "decimals": 18,
      "name": "Maker",
      "symbol": "MKR",
      "totalSupply": {
        "formatted": "977631.036950888222010062",
        "value": 977631036950888222010062n,
      },
    }
  `)
})

test('behavior: bogus token', async () => {
  await expect(
    getToken(config, {
      address: '0xa0cf798816d4b9b9866b5330eea46a18382f251e',
    }),
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
    "The contract function \\"decimals\\" returned no data (\\"0x\\").

    This could be due to any of the following:
      - The contract does not have the function \\"decimals\\",
      - The parameters passed to the contract function may be invalid, or
      - The address is not a contract.
     
    Contract Call:
      address:   0xa0cf798816d4b9b9866b5330eea46a18382f251e
      function:  decimals()

    Docs: https://viem.sh/docs/contract/multicall
    Version: viem@2.8.4"
  `)
})
