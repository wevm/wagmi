import { type QueryKey, replaceEqualDeep } from '@tanstack/query-core'

export function structuralSharing<data>(
  oldData: data | undefined,
  newData: data,
): data {
  return replaceEqualDeep(oldData, newData)
}

export function hashFn(queryKey: QueryKey): string {
  return JSON.stringify(queryKey, (_, value) => {
    if (isPlainObject(value))
      return Object.keys(value)
        .sort()
        .reduce((result, key) => {
          result[key] = value[key]
          return result
        }, {} as any)
    if (typeof value === 'bigint') return value.toString()
    return value
  })
}

// biome-ignore lint/complexity/noBannedTypes: using
function isPlainObject(value: any): value is Object {
  if (!hasObjectPrototype(value)) {
    return false
  }

  // If has modified constructor
  const ctor = value.constructor
  if (typeof ctor === 'undefined') return true

  // If has modified prototype
  const prot = ctor.prototype
  if (!hasObjectPrototype(prot)) return false

  // If constructor does not have an Object-specific method
  // biome-ignore lint/suspicious/noPrototypeBuiltins: using
  if (!prot.hasOwnProperty('isPrototypeOf')) return false

  // Most likely a plain Object
  return true
}

function hasObjectPrototype(o: any): boolean {
  return Object.prototype.toString.call(o) === '[object Object]'
}

export function filterQueryOptions<type extends Record<string, unknown>>(
  options: type,
): type {
  // destructuring is super fast
  // biome-ignore format: no formatting
  const {
    // import('@tanstack/query-core').QueryOptions
    // biome-ignore lint/correctness/noUnusedVariables: tossing
    _defaulted, behavior, gcTime, initialData, initialDataUpdatedAt, maxPages, meta, networkMode, queryFn, queryHash, queryKey, queryKeyHashFn, retry, retryDelay, structuralSharing,

    // import('@tanstack/query-core').InfiniteQueryObserverOptions
    // biome-ignore lint/correctness/noUnusedVariables: tossing
    getPreviousPageParam, getNextPageParam, initialPageParam,

    // import('@tanstack/react-query').UseQueryOptions
    // biome-ignore lint/correctness/noUnusedVariables: tossing
    _optimisticResults, enabled, notifyOnChangeProps, placeholderData, refetchInterval, refetchIntervalInBackground, refetchOnMount, refetchOnReconnect, refetchOnWindowFocus, retryOnMount, select, staleTime, suspense, throwOnError,

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // wagmi
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // biome-ignore lint/correctness/noUnusedVariables: tossing
    config, connector, query,
    ...rest
  } = options

  return rest as type
}
