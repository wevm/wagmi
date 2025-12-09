import type { DefaultError, QueryKey } from '@tanstack/solid-query'
import type { Config } from '@wagmi/core'
import type { Omit } from '@wagmi/core/internal'

import type {
  SolidInfiniteQueryParameters,
  SolidQueryParameters,
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
        SolidQueryParameters<queryFnData, error, data, queryKey>,
        'queryFn' | 'queryHash' | 'queryKey' | 'queryKeyHashFn' | 'throwOnError'
      >
    | undefined
}

export type InfiniteQueryParameter<
  queryFnData = unknown,
  error = DefaultError,
  data = queryFnData,
  queryKey extends QueryKey = QueryKey,
  pageParam = unknown,
> = {
  query: Omit<
    SolidInfiniteQueryParameters<queryFnData, error, data, queryKey, pageParam>,
    'queryFn' | 'queryHash' | 'queryKey' | 'queryKeyHashFn' | 'throwOnError'
  >
}
