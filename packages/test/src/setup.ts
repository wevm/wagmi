import { disconnect } from '@wagmi/core'
import { afterAll, beforeAll, beforeEach } from 'vitest'
import { testClient } from './clients.js'
import { config } from './config.js'

beforeAll(async () => {
  await Promise.all(
    Object.values(testClient).map((client) => client.resetFork()),
  )
})

beforeEach(async () => {
  await disconnect(config).catch(() => {})
})

afterAll(async () => {
  await Promise.all(Object.values(testClient).map((client) => client.destroy()))
})
