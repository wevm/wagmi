import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { getAccount } from './getAccount.js'

test('default', () => {
  expect(getAccount(config)).toMatchInlineSnapshot(`
    {
      "address": undefined,
      "addresses": undefined,
      "chain": undefined,
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
