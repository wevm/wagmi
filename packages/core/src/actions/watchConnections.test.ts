import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import type { Connection } from '../createConfig.js'
import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { watchConnections } from './watchConnections.js'

test('default', async () => {
  const connections: Connection[][] = []
  const unwatch = watchConnections(config, {
    onChange(connection) {
      connections.push(connection)
    },
  })

  const connector = config.connectors[0]!
  expect(connections).toEqual([])
  await connect(config, { connector })
  expect(connections[0]?.length).toEqual(1)
  await disconnect(config, { connector })
  expect(connections[1]).toEqual([])

  unwatch()
})
