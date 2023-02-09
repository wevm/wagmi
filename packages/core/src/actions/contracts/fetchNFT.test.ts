import { beforeEach, describe, expect, it } from 'vitest'

import { setupClient } from '../../../test'
import { fetchNFT } from './fetchNFT'

describe('fetchNFT', () => {
  describe('args', () => {
    beforeEach(() => {
      setupClient()
    })

    describe('address', () => {
      it('has token', async () => {
        expect(
          await fetchNFT({
            address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
            id: '1',
          }),
        ).toMatchInlineSnapshot(`
          {
            "address": "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
            "name": "BoredApeYachtClub",
            "symbol": "BAYC",
            "totalSupply": {
              "formatted": "1000",
              "value": {
                "hex": "0x3e8",
                "type": "BigNumber",
              },
            },
            "uri": "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/1",
          }
        `)
      })

      it('bogus token', async () => {
        try {
          await fetchNFT({
            address: '0xa0cf798816d4b9b9866b5330eea46a18382f251e',
            id: '1',
          })
        } catch (error) {
          expect((error as Error).message).toContain(
            'returned an empty response',
          )
        }
      })
    })

    it('chainId', async () => {
      expect(
        await fetchNFT({
          address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
          id: '1',
          chainId: 1,
        }),
      ).toMatchInlineSnapshot(`
        {
          "address": "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
          "name": "BoredApeYachtClub",
          "symbol": "BAYC",
          "totalSupply": {
            "formatted": "1000",
            "value": {
              "hex": "0x3e8",
              "type": "BigNumber",
            },
          },
          "uri": "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/1",
        }
      `)
    })
  })
})
