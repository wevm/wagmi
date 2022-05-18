import { setupClient } from '../../../test'
import { connect } from './connect'
import { disconnect } from './disconnect'
import { GetAccountResult } from './getAccount'
import { watchAccount } from './watchAccount'

describe('watchAccount', () => {
  it('callback receives data', async () => {
    const client = setupClient()

    const accounts: GetAccountResult[] = []
    const unwatch = watchAccount((data) => accounts.push(data))

    await connect({ connector: client.connectors[0] })
    await disconnect()
    await connect({ connector: client.connectors[0] })
    unwatch()

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
