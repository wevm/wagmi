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
