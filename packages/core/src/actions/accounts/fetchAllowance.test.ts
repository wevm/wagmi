import { beforeEach, describe, expect, it, vi } from 'vitest'

import { setupClient } from '../../../test'
import { fetchAllowance } from './fetchAllowance'

describe('fetchAllowance', () => {
  describe('args', () => {
    beforeEach(() => {
      console.warn = vi.fn()
      setupClient()
    })

    describe('addressOrName', () => {
      it('address', async () => {
        expect(
          await fetchAllowance({
            ownerAddressOrName: '0x26C9De483aEE4Cf32f96DDD42f2fa64EF3CBfe54',
            spenderAddressOrName: '0xe892089198409Fe72DAB959Abe75Fa68292Efd2B',
            token: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
          }),
        ).toMatchInlineSnapshot(`
          {
            "decimals": 6,
            "formatted": "10000.0",
            "symbol": "USDC",
            "value": {
              "type": "BigNumber",
              "hex": "0x02540be400"
            },
          }
        `)
      })

      it('name', async () => {
        expect(
          await fetchAllowance({
            ownerAddressOrName: '0x26C9De483aEE4Cf32f96DDD42f2fa64EF3CBfe54',
            spenderAddressOrName: 'smakosh.eth',
            token: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
            formatUnits: 'mwei',
          }),
        ).toMatchInlineSnapshot(`
          {
            "decimals": 6,
            "formatted": "10000.0",
            "symbol": "USDC",
            "value": {
              "type": "BigNumber",
              "hex": "0x02540be400"
            },
          }
        `)
      })
    })

    it('chainId', async () => {
      expect(
        await fetchAllowance({
          ownerAddressOrName: '0x26C9De483aEE4Cf32f96DDD42f2fa64EF3CBfe54',
          spenderAddressOrName: '0xe892089198409Fe72DAB959Abe75Fa68292Efd2B',
          token: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
          formatUnits: 'mwei',
          chainId: 5,
        }),
      ).toMatchInlineSnapshot(`
        {
          "decimals": 6,
          "formatted": "10000.0",
          "symbol": "USDC",
          "value": {
            "type": "BigNumber",
            "hex": "0x02540be400"
          },
        }
      `)
    })

    it('formatUnits', async () => {
      expect(
        await fetchAllowance({
          ownerAddressOrName: '0x26C9De483aEE4Cf32f96DDD42f2fa64EF3CBfe54',
          spenderAddressOrName: '0xe892089198409Fe72DAB959Abe75Fa68292Efd2B',
          token: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
          formatUnits: 'mwei',
        }),
      ).toMatchInlineSnapshot(`
        {
          "decimals": 6,
          "formatted": "10000.0",
          "symbol": "USDC",
          "value": {
            "type": "BigNumber",
            "hex": "0x02540be400"
          },
        }
      `)
    })
  })

  describe('behavior', () => {
    it('token with less than 18 decimals formats units correctly', async () => {
      expect(
        await fetchAllowance({
          ownerAddressOrName: '0x26C9De483aEE4Cf32f96DDD42f2fa64EF3CBfe54',
          spenderAddressOrName: '0xe892089198409Fe72DAB959Abe75Fa68292Efd2B',
          formatUnits: 'mwei',
          token: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        }),
      ).toMatchInlineSnapshot(`
        {
          "decimals": 6,
          "formatted": "10000.0",
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
