import type { DefaultError, QueryKey } from '@tanstack/react-query'
import type { Config } from '@wagmi/core'
import type { Omit } from '@wagmi/core/internal'

import type {
  UseInfiniteQueryParameters,
  UseQueryParameters,
} from '../utils/query.js'

export type EnabledParameter = {
  enabled?: boolean | undefined
}

export type ConfigParameter<config extends Config = Config> = {
  config?: Config | config | undefined
}

export type QueryParameter<
  queryFnData = unknown,
  error = DefaultError,
  data = queryFnData,
  queryKey extends QueryKey = QueryKey,
> = {
  query?:
    | Omit<
        UseQueryParameters<queryFnData, error, data, queryKey>,
        'queryFn' | 'queryHash' | 'queryKey' | 'queryKeyHashFn' | 'throwOnError'
      >
    | undefined
}

export type InfiniteQueryParameter<
  queryFnData = unknown,
  error = DefaultError,
  data = queryFnData,
  queryData = queryFnData,
  queryKey extends QueryKey = QueryKey,
  pageParam = unknown,
> = {
  query: Omit<
    UseInfiniteQueryParameters<
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
