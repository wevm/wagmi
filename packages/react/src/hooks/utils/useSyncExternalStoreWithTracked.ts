import { useRef } from 'react'
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/shim/with-selector.js'

import { shallow } from '../../utils'

const isObject = (obj: unknown) =>
  typeof obj === 'object' && !Array.isArray(obj)

export function useSyncExternalStoreWithTracked<Snapshot, Selection = Snapshot>(
  subscribe: (onStoreChange: () => void) => () => void,
  getSnapshot: () => Snapshot,
  getServerSnapshot: undefined | null | (() => Snapshot),
  selector: (snapshot: Snapshot) => Selection = (x) => x as any,
) {
  const trackedKeys = useRef<string[]>([])
  const result = useSyncExternalStoreWithSelector(
    subscribe,
    getSnapshot,
    getServerSnapshot,
    selector,
    (a, b) => {
      if (isObject(a) && isObject(b)) {
        if (trackedKeys.current.length > 0) {
          let isEqual = true
          for (const key of trackedKeys.current) {
            isEqual =
              (a as { [key: string]: any })[key] ===
              (b as { [key: string]: any })[key]
          }
          return isEqual
        }
        return shallow(a, b)
      }
      return a === b
    },
  )

  if (isObject(result)) {
    const trackedResult = { ...result }
    Object.defineProperties(
      trackedResult,
      Object.entries(trackedResult as { [key: string]: any }).reduce(
        (res, [key, value]) => {
          return {
            ...res,
            [key]: {
              configurable: false,
              enumerable: true,
              get: () => {
                if (!trackedKeys.current.includes(key)) {
                  trackedKeys.current.push(key)
                }
                return value
              },
            },
          }
        },
        {},
      ),
    )
    return trackedResult
  }

  return result
}
