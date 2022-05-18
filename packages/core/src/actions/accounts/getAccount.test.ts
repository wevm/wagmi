import { getSigners, setupClient } from '../../../test'
import { MockConnector } from '../../connectors/mock'
import { connect } from './connect'
import { getAccount } from './getAccount'

const connector = new MockConnector({
  options: { signer: getSigners()[0] },
})

describe('getAccount', () => {
  beforeEach(() => setupClient())

  describe('behavior', () => {
    it('not connected', async () => {
      expect(getAccount()).toMatchInlineSnapshot(`
        {
          "address": undefined,
          "connector": undefined,
        }
      `)
    })

    it('connected', async () => {
      await connect({ connector })
      expect(getAccount()).toMatchInlineSnapshot(`
        {
          "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "connector": "<MockConnector>",
        }
      `)
    })
  })
})
