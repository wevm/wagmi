import type { DefaultError, QueryKey } from '@tanstack/solid-query'
import type { Omit } from '@wagmi/core/internal'
import type { SolidInfiniteQueryParameters } from '../utils/query.js'

export type InfiniteQueryParameter<
  queryFnData = unknown,
  error = DefaultError,
  data = queryFnData,
  queryData = queryFnData,
  queryKey extends QueryKey = QueryKey,
  pageParam = unknown,
> = {
  query: Omit<
    SolidInfiniteQueryParameters<
      queryFnData,
      error,
      data,
      queryData,
      queryKey,
      pageParam
    >,
    'queryFn' | 'queryHash' | 'queryKey' | 'queryKeyHashFn' | 'throwOnError'
  >
}
