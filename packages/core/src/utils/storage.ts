export type WagmiStorage = Omit<
  Storage,
  'getItem' | 'setItem' | 'removeItem'
> & {
  getItem: <T>(key: string, defaultState?: T | null) => T | null
  setItem: <T>(key: string, value: T | null) => void
  removeItem: (key: string) => void
}

export const noopStorage: Storage = {
  length: 0,
  clear: () => null,
  getItem: (_key: string) => '',
  setItem: (_key: string, _value: string) => null,
  removeItem: (_key: string) => null,
  key: (_index: number) => null,
}

export function createWagmiStorage({
  storage,
  key: prefix = 'wagmi',
}: {
  storage: Storage
  key?: string
}): WagmiStorage {
  return {
    ...storage,
    getItem: (key, defaultState = null) => {
      const value = storage.getItem(`${prefix}.${key}`)
      try {
        return value ? JSON.parse(value) : defaultState
      } catch (error) {
        console.warn(error)
        return defaultState
      }
    },
    setItem: (key, value) => {
      if (value === null) {
        storage.removeItem(`${prefix}.${key}`)
      } else {
        try {
          storage.setItem(`${prefix}.${key}`, JSON.stringify(value))
        } catch (err) {
          console.error(err)
        }
      }
    },
    removeItem: (key) => storage.removeItem(`${prefix}.${key}`),
  }
}
