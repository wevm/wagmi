import { setupWagmiClient } from '../../../test'
import { connect } from './connect'
import { disconnect } from './disconnect'

describe('disconnect', () => {
  it('disconnects', async () => {
    const client = setupWagmiClient()

    await connect(client.connectors[0])
    expect(client.data?.account).toMatchInlineSnapshot(
      `"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"`,
    )

    await disconnect()
    expect(client.data?.account).toMatchInlineSnapshot(`undefined`)
  })
})
