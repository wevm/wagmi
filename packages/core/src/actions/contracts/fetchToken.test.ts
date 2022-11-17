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
              "formatted": "1000000000.0",
              "value": {
                "hex": "0x033b2e3c9fd0803ce8000000",
                "type": "BigNumber",
              },
            },
          }
        `)
      })

      it('bogus token', async () => {
        try {
          await fetchToken({
            address: '0xa0cf798816d4b9b9866b5330eea46a18382f251e',
          })
        } catch (error) {
          expect((error as Error).message).toContain(
            'returned an empty response',
          )
        }
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
            "value": {
              "hex": "0xcf057c15cb9b4eb7aace",
              "type": "BigNumber",
            },
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
            "formatted": "1000000000.0",
            "value": {
              "hex": "0x033b2e3c9fd0803ce8000000",
              "type": "BigNumber",
            },
          },
        }
      `)
    })

    it('formatUnits', async () => {
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
            "formatted": "1000000000000000000.0",
            "value": {
              "hex": "0x033b2e3c9fd0803ce8000000",
              "type": "BigNumber",
            },
          },
        }
      `)
    })
  })
})
