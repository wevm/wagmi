import { setupWagmiClient } from '../../../test'
import { wagmiClient } from '../../client'
import { connect } from './connect'
import { fetchSigner } from './fetchSigner'

describe('fetchSigner', () => {
  it('not connected', async () => {
    setupWagmiClient()
    expect(await fetchSigner()).toMatchInlineSnapshot(`undefined`)
  })

  it('connected', async () => {
    setupWagmiClient()
    await connect(wagmiClient.connectors[0])
    expect(await fetchSigner()).toMatchInlineSnapshot(`
      Wallet {
        "_isSigner": true,
        "_mnemonic": [Function],
        "_signingKey": [Function],
        "address": "0x012363D61BDC53D0290A0f25e9C89F8257550FB8",
        "provider": null,
      }
    `)
  })
})
