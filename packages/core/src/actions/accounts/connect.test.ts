import { getSigners, setupClient } from '../../../test'
import { MockConnector } from '../../connectors/mock'
import { connect } from './connect'

const connector = new MockConnector({
  options: { signer: getSigners()[0] },
})

describe('connect', () => {
  beforeEach(() => setupClient())

  describe('args', () => {
    it('connector', async () => {
      expect(await connect({ connector })).toMatchInlineSnapshot(`
        {
          "account": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "chain": {
            "id": 1,
            "unsupported": false,
          },
          "connector": "<MockConnector>",
          "provider": "<MockProvider>",
        }
      `)
    })
  })

  describe('behavior', () => {
    it('connects to unsupported chain', async () => {
      const result = await connect({
        connector: new MockConnector({
          options: {
            network: 69,
            signer: getSigners()[0],
          },
        }),
      })
      expect(result.chain.unsupported).toBeTruthy()
    })

    it('is already connected', async () => {
      await connect({ connector })
      await expect(
        connect({ connector }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Connector already connected"`,
      )
    })

    it('user rejected request', async () => {
      await expect(
        connect({
          connector: new MockConnector({
            options: {
              flags: { failConnect: true },
              signer: getSigners()[0],
            },
          }),
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"User rejected request"`)
    })
  })
})
