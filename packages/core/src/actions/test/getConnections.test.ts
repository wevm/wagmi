import { config } from '@wagmi/test'
import { describe, expect, test } from 'vitest'

import type { Connection } from '../../config.js'
import { connect } from '../connect.js'
import { disconnect } from '../disconnect.js'
import { getConnections, watchConnections } from '../getConnections.js'

describe('getConnections', () => {
  test('default', async () => {
    const connector = config.connectors[0]!
    expect(getConnections(config)).toEqual([])
    await connect(config, { connector })
    expect(getConnections(config).length).toEqual(1)
    await disconnect(config, { connector })
    expect(getConnections(config)).toEqual([])
  })
})

describe('watchConnections', () => {
  test('default', async () => {
    const connections: Connection[][] = []
    const unwatch = watchConnections(config, {
      onChange: (connection) => connections.push(connection),
    })

    const connector = config.connectors[0]!
    expect(connections).toEqual([])
    await connect(config, { connector })
    expect(connections[0]?.length).toEqual(1)
    await disconnect(config, { connector })
    expect(connections[1]).toEqual([])

    unwatch()
  })
})
