// Ideally we don't have this file, but `useQuery` currently has some quirks where it is super hard to
// pass down the inferred `initialData` type because of it's discriminated overload in the on `useQuery`.

import {
  type DefaultError,
  type QueryKey,
  type QueryOptions,
  type UseQueryOptions,
  type UseQueryResult,
  useQuery as useQuery_,
} from '@tanstack/react-query'

export type UseQueryParameters<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = Omit<
  UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  'initialData'
> & {
  initialData?: QueryOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryKey
  >['initialData']
}

export type UseQueryReturnType<
  TData = unknown,
  TError = unknown,
> = UseQueryResult<TData, TError>

export function useQuery<
  TQueryFnData,
  TError,
  TData,
  TQueryKey extends QueryKey,
>(
  args: UseQueryParameters<TQueryFnData, TError, TData, TQueryKey>,
): UseQueryReturnType<TData, TError> {
  return useQuery_(args as any)
}
