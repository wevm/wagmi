import { setupWagmiClient } from '../../../test'
import { connect } from './connect'
import { fetchSigner } from './fetchSigner'

describe('fetchSigner', () => {
  it('not connected', async () => {
    setupWagmiClient()
    expect(await fetchSigner()).toMatchInlineSnapshot(`undefined`)
  })

  it('connected', async () => {
    const client = setupWagmiClient()
    await connect({ connector: client.connectors[0] })
    const result = await fetchSigner()
    expect(result).toMatchInlineSnapshot(`
      JsonRpcSigner {
        "_address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "_index": null,
        "_isSigner": true,
        "provider": "<WrappedHardhatProvider>",
      }
    `)
  })
})
