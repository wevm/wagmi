import { disconnect } from '@wagmi/core'
import { afterAll, beforeEach, vi } from 'vitest'
import { config, rpcUrl } from './config.js'

// @ts-expect-error
BigInt.prototype.toJSON = function () {
  return this.toString()
}

beforeEach(async () => {
  await disconnect(config).catch(() => {})
})

afterAll(async () => {
  await fetch(`${rpcUrl}/stop`)
})

vi.mock('../src/version.ts', () => {
  return { version: 'x.y.z' }
})

vi.mock('../../core/src/version.ts', () => {
  return { version: 'x.y.z' }
})

// Make dates stable across runs
Date.now = vi.fn(() => new Date(Date.UTC(2023, 1, 1)).valueOf())
