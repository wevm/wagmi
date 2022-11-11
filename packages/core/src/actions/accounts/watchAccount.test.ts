import { describe, expect, it } from 'vitest'

import { setupClient } from '../../../test'
import { connect } from './connect'
import { disconnect } from './disconnect'
import type { GetAccountResult } from './getAccount'
import { watchAccount } from './watchAccount'

describe('watchAccount', () => {
  it('callback receives data', async () => {
    const client = setupClient()

    const accounts: GetAccountResult[] = []
    const unwatch = watchAccount((data) => accounts.push(data))

    await connect({ connector: client.connectors[0]! })
    await disconnect()
    await connect({ connector: client.connectors[0]! })
    unwatch()

    expect(accounts).toMatchInlineSnapshot(`
      [
        {
          "address": undefined,
          "connector": undefined,
          "isConnected": false,
          "isConnecting": true,
          "isDisconnected": false,
          "isReconnecting": false,
          "status": "connecting",
        },
        {
          "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "connector": "<MockConnector>",
          "isConnected": true,
          "isConnecting": false,
          "isDisconnected": false,
          "isReconnecting": false,
          "status": "connected",
        },
        {
          "address": undefined,
          "connector": undefined,
          "isConnected": false,
          "isConnecting": false,
          "isDisconnected": true,
          "isReconnecting": false,
          "status": "disconnected",
        },
        {
          "address": undefined,
          "connector": undefined,
          "isConnected": false,
          "isConnecting": true,
          "isDisconnected": false,
          "isReconnecting": false,
          "status": "connecting",
        },
        {
          "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "connector": "<MockConnector>",
          "isConnected": true,
          "isConnecting": false,
          "isDisconnected": false,
          "isReconnecting": false,
          "status": "connected",
        },
      ]
    `)
  })
})
