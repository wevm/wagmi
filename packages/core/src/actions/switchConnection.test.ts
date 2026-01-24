import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { getConnection } from './getConnection.js'
import { switchConnection } from './switchConnection.js'

const connector1 = config.connectors[0]!
const connector2 = config.connectors[1]!

test('default', async () => {
  await connect(config, { connector: connector2 })
  await connect(config, { connector: connector1 })

  const address1 = getConnection(config).address

  await switchConnection(config, { connector: connector2 })

  const address2 = getConnection(config).address
  expect(address2).toBeDefined()
  expect(address1).not.toBe(address2)

  await switchConnection(config, { connector: connector1 })

  const address3 = getConnection(config).address
  expect(address3).toBeDefined()
  expect(address1).toBe(address3)

  await disconnect(config, { connector: connector1 })
  await disconnect(config, { connector: connector2 })
})
