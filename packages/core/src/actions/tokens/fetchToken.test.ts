import { setupClient } from '../../../test'
import { fetchToken } from './fetchToken'

describe('fetchToken', () => {
  describe('args', () => {
    beforeEach(() => setupClient())

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
        await expect(
          fetchToken({
            address: '0xa0cf798816d4b9b9866b5330eea46a18382f251e',
          }),
        ).rejects.toThrowErrorMatchingInlineSnapshot(
          `"call revert exception [ See: https://links.ethers.org/v5-errors-CALL_EXCEPTION ] (method=\\"symbol()\\", data=\\"0x\\", errorArgs=null, errorName=null, errorSignature=null, reason=null, code=CALL_EXCEPTION, version=abi/5.6.1)"`,
        )
      })
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
