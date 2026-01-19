import type * as Query from '@tanstack/react-query'
import type { UnionLooseOmit } from '@wagmi/core/internal'

export type QueryParameter<
  queryFnData = unknown,
  error = Query.DefaultError,
  data = queryFnData,
  queryKey extends Query.QueryKey = Query.QueryKey,
> = {
  query?:
    | UnionLooseOmit<
        Query.UseQueryOptions<queryFnData, error, data, queryKey>,
        'queryKey' | 'queryFn'
      >
    | undefined
}
