import type {
  CreateQueryOptions,
  DefaultError,
  QueryKey,
} from '@tanstack/svelte-query'
import type { Config } from '@wagmi/core'

export type RuneParameters<T> = () => T
export type RuneReturnType<T> = () => T

export type ConfigParameter<config extends Config = Config> = {
  config?: Config | config | undefined
}

export type EnabledParameter = {
  enabled?: boolean | undefined
}

export type QueryParameter<
  queryFnData = unknown,
  error = DefaultError,
  data = queryFnData,
  queryKey extends QueryKey = QueryKey,
> = {
  query?:
    | Omit<
        CreateQueryOptions<queryFnData, error, data, queryKey>,
        'queryFn' | 'queryHash' | 'queryKey' | 'queryKeyHashFn' | 'throwOnError'
      >
    | undefined
}
