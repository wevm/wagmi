import { config } from '@wagmi/test'
import type { Address } from 'viem'
import { describe, expect, test } from 'vitest'

import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { getAccount, watchAccount } from './getAccount.js'

describe('getAccount', () => {
  test('default', () => {
    expect(getAccount(config)).toMatchInlineSnapshot(`
      {
        "address": undefined,
        "addresses": undefined,
        "chainId": undefined,
        "connector": undefined,
        "isConnected": false,
        "isConnecting": false,
        "isDisconnected": true,
        "isReconnecting": false,
        "status": "disconnected",
      }
    `)
  })

  test('behavior: connected', async () => {
    let result = getAccount(config)
    expect(result.status).toEqual('disconnected')

    await connect(config, { connector: config.connectors[0]! })
    result = getAccount(config)
    expect(result.address).toBeDefined()
    expect(result.status).toEqual('connected')

    await disconnect(config)
    result = getAccount(config)
    expect(result.status).toEqual('disconnected')
  })
})

describe('watchAccount', () => {
  test('default', async () => {
    const accounts: { address: Address | undefined; status: string }[] = []
    const unwatch = watchAccount(config, {
      onChange: (data) =>
        accounts.push({ address: data.address, status: data.status }),
    })

    await connect(config, { connector: config.connectors[0]! })
    await disconnect(config)

    expect(accounts).toMatchInlineSnapshot(`
      [
        {
          "address": undefined,
          "status": "connecting",
        },
        {
          "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "status": "connected",
        },
        {
          "address": undefined,
          "status": "disconnected",
        },
      ]
    `)

    unwatch()
  })
})
