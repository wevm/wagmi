import { type PartializedState } from './createConfig.js'
import type { Evaluate } from './types/utils.js'
import { deserialize as deserialize_ } from './utils/deserialize.js'
import { serialize as serialize_ } from './utils/serialize.js'

// key-values for loose autocomplete and typing
export type StorageItemMap = {
  recentConnectorId: string
  state: PartializedState
}

export type Storage<
  itemMap extends Record<string, unknown> = {},
  ///
  storageItemMap extends StorageItemMap = StorageItemMap & itemMap,
> = {
  getItem<
    key extends keyof storageItemMap,
    value extends storageItemMap[key],
    defaultValue extends value | null | undefined,
  >(
    key: key,
    defaultValue?: defaultValue | undefined,
  ):
    | (defaultValue extends null ? value | null : value)
    | Promise<defaultValue extends null ? value | null : value>
  setItem<
    key extends keyof storageItemMap,
    value extends storageItemMap[key] | null,
  >(key: key, value: value): void | Promise<void>
  removeItem(key: keyof storageItemMap): void | Promise<void>
}

type BaseStorage = {
  getItem(
    key: string,
  ): string | null | undefined | Promise<string | null | undefined>
  setItem(key: string, value: string): void | Promise<void>
  removeItem(key: string): void | Promise<void>
}

export type CreateStorageParameters = {
  deserialize?: (<T>(value: string) => T) | undefined
  key?: string | undefined
  serialize?: (<T>(value: T) => string) | undefined
  storage: Evaluate<BaseStorage>
}

export function createStorage<
  itemMap extends Record<string, unknown> = {},
  storageItemMap extends StorageItemMap = StorageItemMap & itemMap,
>(parameters: CreateStorageParameters): Evaluate<Storage<storageItemMap>> {
  const {
    deserialize = deserialize_,
    key: prefix = 'wagmi',
    serialize = serialize_,
    storage,
  } = parameters

  return {
    ...storage,
    getItem(key, defaultValue) {
      const value = storage.getItem(`${prefix}.${key as string}`)
      if (value instanceof Promise)
        return value.then((x) => (x ? deserialize(x) ?? null : null))
      if (value) return deserialize(value)
      return (defaultValue ?? null) as any
    },
    setItem(key, value) {
      const storageKey = `${prefix}.${key as string}`
      if (value === null) return storage.removeItem(storageKey)
      else return storage.setItem(storageKey, serialize(value)) as any
    },
    removeItem(key) {
      return storage.removeItem(`${prefix}.${key as string}`) as any
    },
  }
}

export const noopStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
} satisfies BaseStorage
