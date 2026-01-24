import { connect, disconnect } from '@wagmi/core'
import { config } from '@wagmi/test'
import { renderComposable } from '@wagmi/test/vue'
import { expect, test } from 'vitest'

import { useConnection } from './useConnection.js'

test('default', async () => {
  const [connection] = renderComposable(() => useConnection())

  expect(connection.address.value).not.toBeDefined()
  expect(connection.status.value).toEqual('disconnected')

  await connect(config, { connector: config.connectors[0]! })

  expect(connection.address.value).toBeDefined()
  expect(connection.status.value).toEqual('connected')

  await disconnect(config)
})
