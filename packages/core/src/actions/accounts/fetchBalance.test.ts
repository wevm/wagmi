import { beforeEach, describe, expect, it, vi } from 'vitest'

import { setupConfig } from '../../../test'
import { fetchBalance } from './fetchBalance'

describe('fetchBalance', () => {
  describe('args', () => {
    beforeEach(() => {
      console.warn = vi.fn()
      setupConfig()
    })

    it('address', async () => {
      expect(
        await fetchBalance({
          address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
        }),
      ).toMatchInlineSnapshot(`
        {
          "decimals": 18,
          "formatted": "0.195308614826705297",
          "symbol": "ETH",
          "value": 195308614826705297n,
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
          "formatted": "0.195308614826705297",
          "symbol": "ETH",
          "value": 195308614826705297n,
        }
      `)
    })

    it('unit', async () => {
      expect(
        await fetchBalance({
          address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
          formatUnits: 'gwei',
        }),
      ).toMatchInlineSnapshot(`
        {
          "decimals": 18,
          "formatted": "195308614.826705297",
          "symbol": "ETH",
          "value": 195308614826705297n,
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
            "value": 18055300000000000000n,
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
            "formatted": "797.136277484508658953",
            "symbol": "MKR",
            "value": 797136277484508658953n,
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
          "value": 500001000n,
        }
      `)
    })
  })
})
