import { setupClient } from '../../../test'
import { fetchBalance } from './fetchBalance'

describe('fetchBalance', () => {
  describe('args', () => {
    beforeEach(() => {
      console.warn = jest.fn()
      setupClient()
    })

    describe('addressOrName', () => {
      it('address', async () => {
        expect(
          await fetchBalance({
            addressOrName: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
          }),
        ).toMatchInlineSnapshot(`
          {
            "decimals": 18,
            "formatted": "1.622080339908136684",
            "symbol": "ETH",
            "unit": "ether",
            "value": {
              "hex": "0x1682c979995e8eec",
              "type": "BigNumber",
            },
          }
        `)
      })

      it('name', async () => {
        expect(
          await fetchBalance({
            addressOrName: 'awkweb.eth',
          }),
        ).toMatchInlineSnapshot(`
          {
            "decimals": 18,
            "formatted": "1.622080339908136684",
            "symbol": "ETH",
            "unit": "ether",
            "value": {
              "hex": "0x1682c979995e8eec",
              "type": "BigNumber",
            },
          }
        `)
      })
    })

    it('chainId', async () => {
      expect(
        await fetchBalance({
          addressOrName: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
          chainId: 1,
        }),
      ).toMatchInlineSnapshot(`
        {
          "decimals": 18,
          "formatted": "1.622080339908136684",
          "symbol": "ETH",
          "unit": "ether",
          "value": {
            "hex": "0x1682c979995e8eec",
            "type": "BigNumber",
          },
        }
      `)
    })

    it('formatUnits', async () => {
      expect(
        await fetchBalance({
          addressOrName: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
          formatUnits: 'gwei',
        }),
      ).toMatchInlineSnapshot(`
        {
          "decimals": 18,
          "formatted": "1622080339.908136684",
          "symbol": "ETH",
          "unit": "gwei",
          "value": {
            "hex": "0x1682c979995e8eec",
            "type": "BigNumber",
          },
        }
      `)
    })

    describe('token', () => {
      it('address', async () => {
        expect(
          await fetchBalance({
            addressOrName: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
            token: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
          }),
        ).toMatchInlineSnapshot(`
          {
            "decimals": 18,
            "formatted": "18.0553",
            "symbol": "UNI",
            "unit": "ether",
            "value": {
              "hex": "0xfa914fb05d1c4000",
              "type": "BigNumber",
            },
          }
        `)
      })

      describe('name', () => {
        it('valid', async () => {
          expect(
            await fetchBalance({
              addressOrName: 'awkweb.eth',
              token: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
            }),
          ).toMatchInlineSnapshot(`
            {
              "decimals": 18,
              "formatted": "18.0553",
              "symbol": "UNI",
              "unit": "ether",
              "value": {
                "hex": "0xfa914fb05d1c4000",
                "type": "BigNumber",
              },
            }
          `)
        })

        it('not configured', async () => {
          await expect(
            fetchBalance({
              addressOrName: 'thisnamedoesnotexist.eth',
              token: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
            }),
          ).rejects.toThrowErrorMatchingInlineSnapshot(
            `"ENS name not configured (operation=\\"resolveName(\\\\\\"thisnamedoesnotexist.eth\\\\\\")\\", code=UNSUPPORTED_OPERATION, version=ethers/5.6.5)"`,
          )
        })
      })
    })
  })
})
