import * as React from 'react'

export const useLocalStorage = <T>(
  key: string,
  defaultState: T | null = null,
) => {
  const [value, setValue] = React.useState<T | null>(() => {
    if (typeof localStorage === 'undefined') return defaultState

    const value = localStorage.getItem(key)
    try {
      return value ? (JSON.parse(value) as T) : defaultState
    } catch (error) {
      console.warn(error)
      return defaultState
    }
  })

  const setLocalStorage = React.useCallback(
    (newValue: T | null) => {
      if (newValue === value) return
      setValue(newValue)

      if (newValue === null) localStorage.removeItem(key)
      else localStorage.setItem(key, JSON.stringify(newValue))

      if (newValue === null) {
        localStorage.removeItem(key)
      } else {
        try {
          localStorage.setItem(key, JSON.stringify(newValue))
        } catch (error) {
          console.error(error)
        }
      }
    },
    [value, setValue, key],
  )

  return [value, setLocalStorage] as const
}
