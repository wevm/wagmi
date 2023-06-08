import { beforeEach, describe, expect, it } from 'vitest'

import { getWalletClients, setupConfig } from '../../../test'
import { getConfig } from '../../config'
import { MockConnector } from '../../connectors/mock'
import { connect } from './connect'

const connector = new MockConnector({
  options: { walletClient: getWalletClients()[0]! },
})

describe('connect', () => {
  beforeEach(() => {
    setupConfig()
  })

  describe('args', () => {
    it('connector', async () => {
      expect(await connect({ connector })).toMatchInlineSnapshot(`
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
  })

  describe('behavior', () => {
    it('connects to unsupported chain', async () => {
      const result = await connect({ chainId: 69, connector })
      expect(result.chain).toMatchInlineSnapshot(`
        {
          "id": 69,
          "unsupported": true,
        }
      `)
    })

    it('connects to supported chain', async () => {
      const result = await connect({ chainId: 5, connector })
      expect(result.chain).toMatchInlineSnapshot(`
        {
          "id": 5,
          "unsupported": false,
        }
      `)
    })

    it('status changes on connection', async () => {
      expect(getConfig().status).toEqual('disconnected')
      setTimeout(() => expect(getConfig().status).toEqual('connecting'), 0)
      await connect({ connector })
      expect(getConfig().status).toEqual('connected')
    })

    it('is already connected', async () => {
      await connect({ connector })
      await expect(
        connect({ connector }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Connector already connected"`,
      )
    })

    it('throws when user rejects request', async () => {
      await expect(
        connect({
          connector: new MockConnector({
            options: {
              flags: { failConnect: true },
              walletClient: getWalletClients()[0]!,
            },
          }),
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        "User rejected the request.

        Details: Failed to connect.
        Version: viem@1.0.0"
      `)
      expect(getConfig().status).toEqual('disconnected')
    })

    it('status changes on user rejection', async () => {
      expect(getConfig().status).toEqual('disconnected')
      await expect(
        connect({
          connector: new MockConnector({
            options: {
              flags: { failConnect: true },
              walletClient: getWalletClients()[0]!,
            },
          }),
        }),
      ).rejects.toThrowError()
      expect(getConfig().status).toEqual('disconnected')
    })
  })
})
