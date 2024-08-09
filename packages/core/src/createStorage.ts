import type { PartializedState } from './createConfig.js'
import type { Compute } from './types/utils.js'
import { deserialize as deserialize_ } from './utils/deserialize.js'
import { serialize as serialize_ } from './utils/serialize.js'

// key-values for loose autocomplete and typing
export type StorageItemMap = {
  recentConnectorId: string
  state: PartializedState
}

export type Storage<
  itemMap extends Record<string, unknown> = Record<string, unknown>,
  ///
  storageItemMap extends StorageItemMap = StorageItemMap & itemMap,
> = {
  key: string
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

export type BaseStorage = {
  getItem(
    key: string,
  ): string | null | undefined | Promise<string | null | undefined>
  setItem(key: string, value: string): void | Promise<void>
  removeItem(key: string): void | Promise<void>
}

export type CreateStorageParameters = {
  deserialize?: (<type>(value: string) => type | unknown) | undefined
  key?: string | undefined
  serialize?: (<type>(value: type | any) => string) | undefined
  storage?: Compute<BaseStorage> | undefined
}

export function createStorage<
  itemMap extends Record<string, unknown> = Record<string, unknown>,
  storageItemMap extends StorageItemMap = StorageItemMap & itemMap,
>(parameters: CreateStorageParameters): Compute<Storage<storageItemMap>> {
  const {
    deserialize = deserialize_,
    key: prefix = 'wagmi',
    serialize = serialize_,
    storage = noopStorage,
  } = parameters

  function unwrap<type>(value: type): type | Promise<type> {
    if (value instanceof Promise) return value.then((x) => x).catch(() => null)
    return value
  }

  return {
    ...storage,
    key: prefix,
    async getItem(key, defaultValue) {
      const value = storage.getItem(`${prefix}.${key as string}`)
      const unwrapped = await unwrap(value)
      if (unwrapped) return deserialize(unwrapped) ?? null
      return (defaultValue ?? null) as any
    },
    async setItem(key, value) {
      const storageKey = `${prefix}.${key as string}`
      if (value === null) await unwrap(storage.removeItem(storageKey))
      else await unwrap(storage.setItem(storageKey, serialize(value)))
    },
    async removeItem(key) {
      await unwrap(storage.removeItem(`${prefix}.${key as string}`))
    },
  }
}

export const noopStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
} satisfies BaseStorage
