import { expectTypeOf, test } from 'vitest'
import type { Connection } from './createConfig.js'
import { createStorage } from './createStorage.js'

test('getItem', () => {
  const storage = createStorage({ storage: localStorage })

  expectTypeOf(storage.getItem('recentConnectorId')).toEqualTypeOf<
    string | null | Promise<string | null>
  >()
  expectTypeOf(storage.getItem('recentConnectorId', 'foo')).toEqualTypeOf<
    string | Promise<string>
  >()
  expectTypeOf(storage.getItem('foo')).toEqualTypeOf<unknown>()
  // @ts-expect-error incorrect argument type
  storage.getItem('recentConnectorId', 1n)

  expectTypeOf(storage.getItem('state')).toEqualTypeOf<
    | {
        chainId?: number | undefined
        connections?: Map<string, Connection> | undefined
        current?: string | null | undefined
        status?:
          | 'connected'
          | 'connecting'
          | 'reconnecting'
          | 'disconnected'
          | undefined
      }
    | null
    | Promise<{
        chainId?: number | undefined
        connections?: Map<string, Connection> | undefined
        current?: string | null | undefined
        status?:
          | 'connected'
          | 'connecting'
          | 'reconnecting'
          | 'disconnected'
          | undefined
      } | null>
  >()

  const customStorage = createStorage<{ foo: number }>({
    storage: localStorage,
  })
  expectTypeOf(customStorage.getItem('foo')).toEqualTypeOf<
    number | null | Promise<number | null>
  >()
  expectTypeOf(customStorage.getItem('foo', 1)).toEqualTypeOf<
    number | Promise<number>
  >()
})

test('setItem', () => {
  const storage = createStorage({ storage: localStorage })

  storage.setItem('recentConnectorId', 'foo')
  // @ts-expect-error incorrect argument type
  storage.setItem('recentConnectorId', 1n)
})

test('serialize/deserialize types', () => {
  createStorage({
    deserialize(value) {
      return value
    },
    serialize(value) {
      return value
    },
    storage: localStorage,
  })
})
