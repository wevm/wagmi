import { disconnect } from '@wagmi/core'
import { afterAll, beforeEach } from 'vitest'
import { testClient } from './clients.js'
import { config } from './config.js'

beforeEach(async () => {
  await disconnect(config).catch(() => {})
})

afterAll(async () => {
  // If you are using a fork, you can reset your anvil instance to the initial fork block.
  await Promise.all(Object.values(testClient).map((client) => client.restart()))
})
