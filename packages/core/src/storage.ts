type BaseStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>

export type ClientStorage = {
  getItem: <T>(key: string, defaultState?: T | null) => T | null
  removeItem: (key: string) => void
  setItem: <T>(key: string, value: T | null) => void
  deserialize: (value: string) => any
  serialize: (value: any) => string
}

type CreateStorageConfig = {
  deserialize?: (value: string) => any
  serialize?: (value: any) => string
  storage: BaseStorage
  key?: string
}

export function createStorage({
  deserialize = JSON.parse,
  serialize = JSON.stringify,
  storage,
  key: prefix = 'wagmi',
}: CreateStorageConfig): ClientStorage {
  return {
    ...storage,
    deserialize,
    serialize,
    getItem(key, defaultState = null) {
      const value = storage.getItem(`${prefix}.${key}`)
      try {
        return value ? deserialize(value) : defaultState
      } catch (error) {
        console.warn(error)
        return defaultState
      }
    },
    setItem(key, value) {
      if (value === null) {
        storage.removeItem(`${prefix}.${key}`)
      } else {
        try {
          storage.setItem(`${prefix}.${key}`, serialize(value))
        } catch (err) {
          console.error(err)
        }
      }
    },
    removeItem(key) {
      storage.removeItem(`${prefix}.${key}`)
    },
  }
}

export const noopStorage: BaseStorage = {
  getItem: (_key) => '',
  setItem: (_key, _value) => null,
  removeItem: (_key) => null,
}
