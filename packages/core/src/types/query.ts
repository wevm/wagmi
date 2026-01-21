import type * as Query from '@tanstack/query-core'
import type { Compute, LooseOmit, RequiredBy, UnionLooseOmit } from './utils.js'

export type MutationParameter<
  data = unknown,
  error = Error,
  variables = void,
  context = unknown,
> = {
  mutation?:
    | LooseOmit<
        Query.MutationOptions<data, error, Compute<variables>, context>,
        'mutationFn' | 'mutationKey' | 'throwOnError'
      >
    | undefined
}

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
> = Omit<
  RequiredBy<
    Query.QueryObserverOptions<queryFnData, error, data, queryFnData, queryKey>,
    'queryKey'
  >,
  'queryFn' | 'queryHash' | 'queryKeyHashFn' | 'throwOnError'
> & {
  queryFn: Exclude<
    Query.QueryObserverOptions<
      queryFnData,
      error,
      data,
      queryFnData,
      queryKey
    >['queryFn'],
    typeof Query.skipToken | undefined
  >
}
