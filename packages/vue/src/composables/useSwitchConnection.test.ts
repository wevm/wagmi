import { connect, disconnect } from '@wagmi/core'
import { config } from '@wagmi/test'
import { renderComposable, waitFor } from '@wagmi/test/vue'
import { expect, test } from 'vitest'

import { useConnection } from './useConnection.js'
import { useConnections } from './useConnections.js'
import { useSwitchConnection } from './useSwitchConnection.js'

const connector1 = config.connectors[0]!
const connector2 = config.connectors[1]!

test('default', async () => {
  const [connection] = renderComposable(() => useConnection())
  const [switchConnection] = renderComposable(() => useSwitchConnection())
  const [connections] = renderComposable(() => useConnections())

  expect(connections.value).toEqual([])

  await connect(config, { connector: connector2 })
  await connect(config, { connector: connector1 })

  expect(connections.value.length).toEqual(2)

  const address1 = connection.address.value
  expect(address1).toBeDefined()

  switchConnection.mutate({ connector: connector2 })
  await waitFor(switchConnection.isSuccess)

  const address2 = connection.address.value
  expect(address2).toBeDefined()
  expect(address1).not.toBe(address2)

  switchConnection.mutate({ connector: connector1 })
  await waitFor(switchConnection.isSuccess)

  const address3 = connection.address.value
  expect(address3).toBeDefined()
  expect(address1).toBe(address3)

  await disconnect(config, { connector: connector1 })
  await disconnect(config, { connector: connector2 })
})
