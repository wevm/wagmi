import type { DefaultError, QueryKey } from '@tanstack/vue-query'
import type { Config } from '@wagmi/core'
import type { MaybeRef } from 'vue'
import type { UseQueryParameters } from '../utils/query.js'

export type ConfigParameter<config extends Config = Config> = {
  config?: Config | config | undefined
}

export type EnabledParameter = {
  enabled?: MaybeRef<boolean> | undefined
}

export type MaybeRefBy<value extends object, key extends keyof value> = Omit<
  value,
  key
> & {
  [k in key]: MaybeRef<value[key]>
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
