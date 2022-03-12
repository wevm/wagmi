import { setupWagmiClient } from '../../../test'
import { connect } from './connect'
import { getAccount } from './getAccount'

describe('getAccount', () => {
  it('not connected', async () => {
    setupWagmiClient()
    expect(getAccount()).toMatchInlineSnapshot(`
      {
        "address": undefined,
        "connector": undefined,
      }
    `)
  })

  it('connected', async () => {
    const client = setupWagmiClient()
    await connect(client.connectors[0])
    expect(getAccount()).toMatchInlineSnapshot(`
      {
        "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "connector": "<MockConnector>",
      }
    `)
  })
})
