// Ideally we don't have this file, but `useQuery` currently has some quirks where it is super hard to
// pass down the inferred `initialData` type because of it's discriminated overload in the on `useQuery`.

import {
  type DefaultError,
  type QueryKey,
  type UseQueryOptions,
  type UseQueryResult,
  useQuery as useQuery_,
} from '@tanstack/react-query'

export type UseQueryParameters<
  queryFnData = unknown,
  error = DefaultError,
  data = queryFnData,
  queryKey extends QueryKey = QueryKey,
> = Omit<UseQueryOptions<queryFnData, error, data, queryKey>, 'initialData'> & {
  initialData?: UseQueryOptions<
    queryFnData,
    error,
    data,
    queryKey
  >['initialData']
}

export function useQuery<queryFnData, error, data, queryKey extends QueryKey>(
  args: UseQueryParameters<queryFnData, error, data, queryKey>,
): UseQueryResult<data, error> {
  return useQuery_(args as any)
}
