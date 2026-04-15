import { disconnect, getConnection } from '@wagmi/core'
import { afterAll, beforeAll, beforeEach, vi } from 'vitest'
import { config, destroy, restart } from './config.js'

async function disconnectAll() {
  while (getConnection(config).status !== 'disconnected')
    await disconnect(config).catch(() => {})
}

// @ts-expect-error
BigInt.prototype.toJSON = function () {
  return this.toString()
}

beforeAll(async () => {
  await restart()

  await disconnectAll()
})

beforeEach(async () => {
  await disconnectAll()
  // Make dates stable across runs (set here so it doesn't affect beforeAll setup)
  vi.spyOn(Date, 'now').mockReturnValue(
    new Date(Date.UTC(2023, 1, 1)).valueOf(),
  )
})

afterAll(async () => {
  await disconnectAll()
  await destroy()
})

vi.mock('../src/version.ts', () => {
  return { version: 'x.y.z' }
})

vi.mock('../../core/src/version.ts', () => {
  return { version: 'x.y.z' }
})
