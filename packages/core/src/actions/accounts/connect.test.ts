import { Signer } from 'ethers'

import { getMockConnector, getSigners, setupWagmiClient } from '../../../test'
import { connect } from './connect'

describe('connect', () => {
  let signer: Signer
  beforeEach(() => {
    const signers = getSigners()
    signer = signers[0]
  })

  it('connects', async () => {
    const client = setupWagmiClient()
    expect(client.connector).toBeUndefined()
    const result = await connect({ connector: client.connectors[0] })

    expect(result).toMatchInlineSnapshot(`
      {
        "account": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "chain": {
          "id": 1,
          "unsupported": false,
        },
        "connector": "<MockConnector>",
        "provider": "<MockProvider>",
      }
    `)
  })

  it('connects to unsupported chain', async () => {
    const client = setupWagmiClient({
      connectors: [
        getMockConnector({
          network: 69,
          signer,
        }),
      ],
    })
    expect(client.connector).toBeUndefined()
    const result = await connect({ connector: client.connectors[0] })

    expect(result).toMatchInlineSnapshot(`
      {
        "account": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "chain": {
          "id": 69,
          "unsupported": true,
        },
        "connector": "<MockConnector>",
        "provider": "<MockProvider>",
      }
    `)
  })

  it('connects with already connected connector', async () => {
    const client = setupWagmiClient()
    await connect({ connector: client.connectors[0] })
    await expect(
      connect({ connector: client.connectors[0] }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Connector already connected"`,
    )
  })

  it('fails', async () => {
    const client = setupWagmiClient({
      connectors: [
        getMockConnector({
          signer,
          flags: {
            failConnect: true,
          },
        }),
      ],
    })

    await expect(
      connect({ connector: client.connectors[0] }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"User rejected request"`)
  })
})
