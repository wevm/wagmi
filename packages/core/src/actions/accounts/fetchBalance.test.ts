import { beforeEach, describe, expect, it, vi } from 'vitest'

import { setupClient } from '../../../test'
import { fetchBalance } from './fetchBalance'

describe('fetchBalance', () => {
  describe('args', () => {
    beforeEach(() => {
      console.warn = vi.fn()
      setupClient()
    })

    it('address', async () => {
      expect(
        await fetchBalance({
          address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
        }),
      ).toMatchInlineSnapshot(`
          {
            "decimals": 18,
            "formatted": "0.40742480512617271",
            "symbol": "ETH",
            "value": {
              "hex": "0x05a776b39e3a7026",
              "type": "BigNumber",
            },
          }
        `)
    })

    it('chainId', async () => {
      expect(
        await fetchBalance({
          address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
          chainId: 1,
        }),
      ).toMatchInlineSnapshot(`
        {
          "decimals": 18,
          "formatted": "0.40742480512617271",
          "symbol": "ETH",
          "value": {
            "hex": "0x05a776b39e3a7026",
            "type": "BigNumber",
          },
        }
      `)
    })

    it('formatUnits', async () => {
      expect(
        await fetchBalance({
          address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
          formatUnits: 'gwei',
        }),
      ).toMatchInlineSnapshot(`
        {
          "decimals": 18,
          "formatted": "407424805.12617271",
          "symbol": "ETH",
          "value": {
            "hex": "0x05a776b39e3a7026",
            "type": "BigNumber",
          },
        }
      `)
    })

    describe('token', () => {
      it('address', async () => {
        expect(
          await fetchBalance({
            address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
            token: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
          }),
        ).toMatchInlineSnapshot(`
          {
            "decimals": 18,
            "formatted": "18.0553",
            "symbol": "UNI",
            "value": {
              "hex": "0xfa914fb05d1c4000",
              "type": "BigNumber",
            },
          }
        `)
      })

      it('bytes32 contract', async () => {
        expect(
          await fetchBalance({
            address: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
            token: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
          }),
        ).toMatchInlineSnapshot(`
          {
            "decimals": 18,
            "formatted": "793.706155474190508252",
            "symbol": "MKR",
            "value": {
              "hex": "0x2b06e2b72b1816a0dc",
              "type": "BigNumber",
            },
          }
        `)
      })
    })
  })

  describe('behavior', () => {
    it('token with less than 18 decimals formats units correctly', async () => {
      expect(
        await fetchBalance({
          address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
          token: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        }),
      ).toMatchInlineSnapshot(`
        {
          "decimals": 6,
          "formatted": "500.001",
          "symbol": "USDC",
          "value": {
            "hex": "0x1dcd68e8",
            "type": "BigNumber",
          },
        }
      `)
    })
  })
})
