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
          "formatted": "0.283908469850273318",
          "symbol": "ETH",
          "value": 283908469850273318n,
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
          "formatted": "0.283908469850273318",
          "symbol": "ETH",
          "value": 283908469850273318n,
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
          "formatted": "283908469.850273318",
          "symbol": "ETH",
          "value": 283908469850273318n,
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
            "formatted": "797.13433855575639986",
            "symbol": "MKR",
            "value": 797134338555756399860n,
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
