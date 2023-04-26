import { beforeEach, describe, expect, it } from 'vitest'

import { setupClient } from '../../../test'
import { fetchToken } from './fetchToken'

describe('fetchToken', () => {
  describe('args', () => {
    beforeEach(() => {
      setupClient()
    })

    describe('address', () => {
      it('has token', async () => {
        expect(
          await fetchToken({
            address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
          }),
        ).toMatchInlineSnapshot(`
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

      it('bogus token', async () => {
        await expect(() =>
          fetchToken({
            address: '0xa0cf798816d4b9b9866b5330eea46a18382f251e',
          }),
        ).rejects.toMatchInlineSnapshot(`
          [ContractFunctionExecutionError: The contract function "decimals" returned no data ("0x").

          This could be due to any of the following:
            - The contract does not have the function "decimals",
            - The parameters passed to the contract function may be invalid, or
            - The address is not a contract.
           
          Contract Call:
            address:   0xa0cf798816d4b9b9866b5330eea46a18382f251e
            function:  decimals()

          Docs: https://viem.sh/docs/contract/multicall.html
          Version: viem@0.3.12]
        `)
      })
    })

    it('bytes32 contract', async () => {
      expect(
        await fetchToken({
          address: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
        }),
      ).toMatchInlineSnapshot(`
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

    it('chainId', async () => {
      expect(
        await fetchToken({
          address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
          chainId: 1,
        }),
      ).toMatchInlineSnapshot(`
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

    it('unit', async () => {
      expect(
        await fetchToken({
          address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
          formatUnits: 'gwei',
        }),
      ).toMatchInlineSnapshot(`
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
  })
})
