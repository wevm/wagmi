import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { getAccount } from './getAccount.js'
import { switchAccount } from './switchAccount.js'

const connector1 = config.connectors[0]!
const connector2 = config.connectors[1]!

test('default', async () => {
  await connect(config, { connector: connector2 })
  await connect(config, { connector: connector1 })

  const address1 = getAccount(config).address

  await switchAccount(config, { connector: connector2 })

  const address2 = getAccount(config).address
  expect(address2).toBeDefined()
  expect(address1).not.toBe(address2)

  await switchAccount(config, { connector: connector1 })

  const address3 = getAccount(config).address
  expect(address3).toBeDefined()
  expect(address1).toBe(address3)

  await disconnect(config, { connector: connector1 })
  await disconnect(config, { connector: connector2 })
})
