import { disconnect } from '@wagmi/core'
import { afterAll, beforeAll, beforeEach } from 'vitest'
import { testClient } from './clients.js'
import { config } from './config.js'

// Snapshot IDs captured at the initial fork state.
// Reverted in afterAll to reset state without re-forking from the RPC URL,
// avoiding rate limits (429) on public endpoints.
const snapshots: Record<string, `0x${string}`> = {}

beforeAll(async () => {
  await Promise.all(
    Object.entries(testClient).map(async ([key, client]) => {
      const id = await client.snapshot()
      snapshots[key] = id
    }),
  )
})

beforeEach(async () => {
  await disconnect(config).catch(() => {})
})

afterAll(async () => {
  await Promise.all(
    Object.entries(testClient).map(async ([key, client]) => {
      if (snapshots[key]) await client.revert({ id: snapshots[key] })
    }),
  )
})
