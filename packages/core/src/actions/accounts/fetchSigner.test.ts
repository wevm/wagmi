import { setupWagmiClient } from '../../../test'
import { connect } from './connect'
import { fetchSigner } from './fetchSigner'

describe('fetchSigner', () => {
  it('not connected', async () => {
    await setupWagmiClient()
    expect(await fetchSigner()).toMatchInlineSnapshot(`undefined`)
  })

  it('connected', async () => {
    const client = await setupWagmiClient()
    await connect(client.connectors[0])
    const result = await fetchSigner()
    expect(result).toMatchInlineSnapshot(
      `"<SignerWithAddress 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266>"`,
    )
  })
})
