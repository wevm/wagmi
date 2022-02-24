import { setupWagmiClient } from '../../../test'
import { connect } from './connect'
import { disconnect } from './disconnect'

describe('disconnect', () => {
  it('disconnects', async () => {
    const wagmiClient = setupWagmiClient()

    await connect(wagmiClient.connectors[0])
    expect(wagmiClient.data?.account).toMatchInlineSnapshot(
      `"0x012363D61BDC53D0290A0f25e9C89F8257550FB8"`,
    )

    await disconnect()
    expect(wagmiClient.data?.account).toMatchInlineSnapshot(`undefined`)
  })
})
