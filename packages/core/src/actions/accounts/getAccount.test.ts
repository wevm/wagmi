import { beforeEach, describe, expect, it } from 'vitest'

import { getWalletClients, setupClient } from '../../../test'
import { MockConnector } from '../../connectors/mock'
import { connect } from './connect'
import { getAccount } from './getAccount'

const connector = new MockConnector({
  options: { walletClient: getWalletClients()[0]! },
})

describe('getAccount', () => {
  beforeEach(() => {
    setupClient()
  })

  describe('behavior', () => {
    it('not connected', async () => {
      expect(getAccount()).toMatchInlineSnapshot(`
        {
          "address": undefined,
          "connector": undefined,
          "isConnected": false,
          "isConnecting": false,
          "isDisconnected": true,
          "isReconnecting": false,
          "status": "disconnected",
        }
      `)
    })

    it('connected', async () => {
      await connect({ connector })
      expect(getAccount()).toMatchInlineSnapshot(`
        {
          "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "connector": "<MockConnector>",
          "isConnected": true,
          "isConnecting": false,
          "isDisconnected": false,
          "isReconnecting": false,
          "status": "connected",
        }
      `)
    })
  })
})
