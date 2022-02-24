import { MockConnector, defaultChains, wallets } from 'wagmi-testing'

import { setupWagmiClient } from '../../../test'
import { connect } from './connect'

describe('connect', () => {
  it('should connect successfully', async () => {
    const wagmiClient = setupWagmiClient()
    expect(wagmiClient.connector).toBeUndefined()
    const result = await connect(wagmiClient.connectors[0])
    const { data: { provider, ...rest } = {} } = result
    expect(provider).toBeDefined()
    expect(rest).toMatchInlineSnapshot(`
      {
        "account": "0x012363D61BDC53D0290A0f25e9C89F8257550FB8",
        "chain": {
          "id": 1,
          "unsupported": false,
        },
      }
    `)
  })

  it('succeeds (unsupported chain)', async () => {
    const wagmiClient = setupWagmiClient({ chainId: 69 })
    expect(wagmiClient.connector).toBeUndefined()
    const result = await connect(wagmiClient.connectors[0])
    const { data: { provider, ...rest } = {} } = result
    expect(provider).toBeDefined()
    expect(rest).toMatchInlineSnapshot(`
      {
        "account": "0x012363D61BDC53D0290A0f25e9C89F8257550FB8",
        "chain": {
          "id": 69,
          "unsupported": true,
        },
      }
    `)
  })

  it('fails', async () => {
    const wagmiClient = setupWagmiClient({
      connectors: [
        new MockConnector({
          chains: defaultChains,
          options: {
            flags: {
              failConnect: true,
            },
            privateKey: wallets.ethers1.privateKey,
            network: 1,
          },
        }),
      ],
    })
    expect(wagmiClient.connector).toBeUndefined()
    try {
      await connect(wagmiClient.connectors[0])
    } catch (err) {
      expect(err).toMatchInlineSnapshot(
        `[UserRejectedRequestError: User rejected request]`,
      )
    }
  })
})
