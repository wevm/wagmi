import { expectTypeOf, test } from 'vitest'
import { createStorage } from './storage.js'

import type { Connection } from './config.js'

const storage = createStorage({ storage: localStorage })

test('getItem', () => {
  expectTypeOf(storage.getItem('recentConnectorId')).toEqualTypeOf<
    string | null
  >()
  expectTypeOf(
    storage.getItem('recentConnectorId', 'foo'),
  ).toEqualTypeOf<string>()
  // @ts-expect-error unknown key
  storage.getItem('foo')
  // @ts-expect-error incorrect argument type
  storage.getItem('recentConnectorId', 1n)

  expectTypeOf(storage.getItem('state')).toEqualTypeOf<{
    chainId?: number
    connections?: Map<string, Connection>
    current?: string | undefined
    status?: 'connected' | 'connecting' | 'reconnecting' | 'disconnected'
  } | null>()

  const customStorage = createStorage<{ foo: number }>({
    storage: localStorage,
  })
  expectTypeOf(customStorage.getItem('foo')).toEqualTypeOf<number | null>()
  expectTypeOf(customStorage.getItem('foo', 1)).toEqualTypeOf<number>()
})

test('setItem', () => {
  storage.setItem('recentConnectorId', 'foo')
  // @ts-expect-error incorrect argument type
  storage.setItem('recentConnectorId', 1n)
})
