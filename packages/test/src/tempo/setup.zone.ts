import { disconnect } from '@wagmi/core'
import { beforeEach, vi } from 'vitest'
import { config, queryClient, zoneChain, zoneStore } from './zone.js'

// @ts-expect-error
BigInt.prototype.toJSON = function () {
  return this.toString()
}

beforeEach(async () => {
  vi.restoreAllMocks()
  await disconnect(config).catch(() => {})
  queryClient.clear()
  await zoneStore.removeItem(`auth:token:${zoneChain.id}`)
})

vi.mock('../src/version.ts', () => ({ version: 'x.y.z' }))
vi.mock('../../core/src/version.ts', () => ({ version: 'x.y.z' }))
