import type * as Query from '@tanstack/query-core'
import type { RequiredBy, UnionLooseOmit } from '../../types/utils.js'

export type QueryParameter<
  queryFnData = unknown,
  error = Query.DefaultError,
  data = queryFnData,
  queryKey extends Query.QueryKey = Query.QueryKey,
> = {
  query?:
    | UnionLooseOmit<
        QueryOptions<queryFnData, error, data, queryKey>,
        'queryKey' | 'queryFn'
      >
    | undefined
}

export type QueryOptions<
  queryFnData = unknown,
  error = Query.DefaultError,
  data = queryFnData,
  queryKey extends Query.QueryKey = Query.QueryKey,
> = RequiredBy<
  Query.QueryOptions<queryFnData, error, data, queryKey>,
  'queryKey' | 'queryFn'
> & { enabled: boolean }

export function filterQueryOptions<type extends Record<string, unknown>>(
  options: type,
): type {
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

    // wagmi
    // biome-ignore lint/correctness/noUnusedVariables: tossing
    config, connector, query,
    ...rest
  } = options

  return rest as type
}
