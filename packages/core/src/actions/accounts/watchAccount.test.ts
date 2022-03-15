import { setupWagmiClient } from '../../../test'
import { connect } from './connect'
import { disconnect } from './disconnect'
import { GetAccountResult } from './getAccount'
import { watchAccount } from './watchAccount'

describe('watchAccount', () => {
  it('callback receives data', async () => {
    const client = setupWagmiClient()

    const accounts: GetAccountResult[] = []
    watchAccount((data) => accounts.push(data))

    await connect(client.connectors[0])
    await disconnect()
    await connect(client.connectors[0])

    expect(accounts).toMatchInlineSnapshot(`
      [
        {
          "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "connector": "<MockConnector>",
        },
        {
          "address": undefined,
          "connector": undefined,
        },
        {
          "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "connector": "<MockConnector>",
        },
      ]
    `)
  })
})
