import { connect } from '@wagmi/core'
import { config } from '@wagmi/test'
import { renderComposable, waitFor } from '@wagmi/test/vue'
import { beforeEach, expect, test } from 'vitest'

import { useConnection } from './useConnection.js'
import { useDisconnect } from './useDisconnect.js'

const connector = config.connectors[0]!

beforeEach(async () => {
  await connect(config, { connector })
})

test('default', async () => {
  const [connection] = renderComposable(() => useConnection())
  const [disconnect] = renderComposable(() => useDisconnect())

  expect(connection.address.value).toBeDefined()
  expect(connection.status.value).toEqual('connected')

  disconnect.mutate()

  await waitFor(connection.isDisconnected, (isDisconnected) =>
    Boolean(isDisconnected),
  )

  expect(connection.address.value).not.toBeDefined()
  expect(connection.status.value).toEqual('disconnected')
})
