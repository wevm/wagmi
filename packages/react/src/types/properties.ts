import type { DefaultError, QueryKey } from '@tanstack/react-query'
import type { Config } from '@wagmi/core'

import type { UseQueryParameters } from '../utils/query.js'

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
  query?: UseQueryParameters<queryFnData, error, data, queryKey> | undefined
}
