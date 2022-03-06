import { Signer } from 'ethers'

import { ethers, getMockConnector, setupWagmiClient } from '../../../test'
import { connect } from './connect'

describe('connect', () => {
  let signer: Signer
  beforeEach(async () => {
    const signers = await ethers.getSigners()
    signer = signers[0]
  })

  it('connects', async () => {
    const client = await setupWagmiClient()
    expect(client.connector).toBeUndefined()
    const result = await connect(client.connectors[0])
    const { data: { provider, ...rest } = {} } = result
    expect(provider).toBeDefined()
    expect(rest).toMatchInlineSnapshot(`
      {
        "account": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "chain": {
          "id": 1,
          "unsupported": false,
        },
      }
    `)
  })

  it('connects to unsupported chain', async () => {
    const client = await setupWagmiClient({
      connectors: [
        getMockConnector({
          network: 69,
          signer,
        }),
      ],
    })
    expect(client.connector).toBeUndefined()
    const result = await connect(client.connectors[0])
    const { data: { provider, ...rest } = {} } = result
    expect(provider).toBeDefined()
    expect(rest).toMatchInlineSnapshot(`
      {
        "account": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "chain": {
          "id": 69,
          "unsupported": true,
        },
      }
    `)
  })

  it('connects with already connected connector', async () => {
    const client = await setupWagmiClient()
    await connect(client.connectors[0])
    try {
      await connect(client.connectors[0])
    } catch (error) {
      expect(error).toMatchInlineSnapshot(
        `[ConnectorAlreadyConnectedError: Connector already connected]`,
      )
    }
  })

  it('fails', async () => {
    const client = await setupWagmiClient({
      connectors: [
        getMockConnector({
          signer,
          flags: {
            failConnect: true,
          },
        }),
      ],
    })

    try {
      await connect(client.connectors[0])
    } catch (error) {
      expect(error).toMatchInlineSnapshot(
        `[UserRejectedRequestError: User rejected request]`,
      )
    }
  })
})
