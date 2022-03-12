import { setupWagmiClient } from '../../../test'
import { connect } from './connect'
import { disconnect } from './disconnect'
import { switchNetwork } from './switchNetwork'
import { watchSigner } from './watchSigner'

describe('watchSigner', () => {
  it('listens to account changes', async () => {
    const client = setupWagmiClient()

    let counter = 0
    watchSigner((data) => {
      if (counter === 0)
        expect(data).toMatchInlineSnapshot(`
          JsonRpcSigner {
            "_address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "_index": null,
            "_isSigner": true,
            "provider": "<WrappedHardhatProvider>",
          }
        `)
      else if (counter === 1)
        expect(data).toMatchInlineSnapshot(`
          JsonRpcSigner {
            "_address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "_index": null,
            "_isSigner": true,
            "provider": "<WrappedHardhatProvider>",
          }
        `)
      counter += 1
    })

    await connect(client.connectors[0])
    await disconnect()
  })

  it('listens to chain changes', async () => {
    const client = setupWagmiClient()

    let counter = 0
    watchSigner((data) => {
      if (counter === 0)
        expect(data).toMatchInlineSnapshot(`
          JsonRpcSigner {
            "_address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "_index": null,
            "_isSigner": true,
            "provider": "<WrappedHardhatProvider>",
          }
        `)
      else if (counter === 1)
        expect(data).toMatchInlineSnapshot(`
          JsonRpcSigner {
            "_address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "_index": null,
            "_isSigner": true,
            "provider": "<WrappedHardhatProvider>",
          }
        `)
      counter += 1
    })

    await connect(client.connectors[0])
    await switchNetwork({ chainId: 4 })
  })
})
