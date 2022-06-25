import {
  InfiniteQueryObserver,
  InfiniteQueryObserverResult,
  QueryFunction,
  QueryKey,
  QueryObserver,
  UseInfiniteQueryOptions,
} from 'react-query'

import { useBaseQuery } from './useBaseQuery'
import { parseQueryArgs, trackResult } from './utils'

type UseInfiniteQueryResult<TData, TError> = Pick<
  InfiniteQueryObserverResult<TData, TError>,
  | 'data'
  | 'error'
  | 'fetchNextPage'
  | 'fetchStatus'
  | 'hasNextPage'
  | 'isError'
  | 'isFetched'
  | 'isFetching'
  | 'isFetchingNextPage'
  | 'isLoading'
  | 'isRefetching'
  | 'isSuccess'
  | 'refetch'
> & {
  isIdle: boolean
  status: 'idle' | 'loading' | 'success' | 'error'
  internal: Pick<
    InfiniteQueryObserverResult,
    | 'dataUpdatedAt'
    | 'errorUpdatedAt'
    | 'failureCount'
    | 'isFetchedAfterMount'
    | 'isLoadingError'
    | 'isPaused'
    | 'isPlaceholderData'
    | 'isPreviousData'
    | 'isRefetchError'
    | 'isStale'
    | 'remove'
  >
}

export function useInfiniteQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: UseInfiniteQueryOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryFnData,
    TQueryKey
  >,
): UseInfiniteQueryResult<TData, TError>
export function useInfiniteQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryKey: TQueryKey,
  options?: Omit<
    UseInfiniteQueryOptions<
      TQueryFnData,
      TError,
      TData,
      TQueryFnData,
      TQueryKey
    >,
    'queryKey'
  >,
): UseInfiniteQueryResult<TData, TError>
export function useInfiniteQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: Omit<
    UseInfiniteQueryOptions<
      TQueryFnData,
      TError,
      TData,
      TQueryFnData,
      TQueryKey
    >,
    'queryKey' | 'queryFn'
  >,
): UseInfiniteQueryResult<TData, TError>
export function useInfiniteQuery<
  TQueryFnData,
  TError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  arg1:
    | TQueryKey
    | UseInfiniteQueryOptions<
        TQueryFnData,
        TError,
        TData,
        TQueryFnData,
        TQueryKey
      >,
  arg2?:
    | QueryFunction<TQueryFnData, TQueryKey>
    | UseInfiniteQueryOptions<
        TQueryFnData,
        TError,
        TData,
        TQueryFnData,
        TQueryKey
      >,
  arg3?: UseInfiniteQueryOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryFnData,
    TQueryKey
  >,
): UseInfiniteQueryResult<TData, TError> {
  const parsedOptions = parseQueryArgs(arg1, arg2, arg3)
  const baseQuery = useBaseQuery(
    parsedOptions,
    InfiniteQueryObserver as typeof QueryObserver,
  )

  const result = {
    data: baseQuery.data,
    error: baseQuery.error,
    fetchNextPage: (<any>baseQuery).fetchNextPage,
    fetchStatus: baseQuery.fetchStatus,
    hasNextPage: (<any>baseQuery).hasNextPage,
    isError: baseQuery.isError,
    isFetched: baseQuery.isFetched,
    isFetching: baseQuery.isFetching,
    isFetchingNextPage: (<any>baseQuery).isFetchingNextPage,
    isIdle: baseQuery.isIdle,
    isLoading: baseQuery.isLoading,
    isRefetching: baseQuery.isRefetching,
    isSuccess: baseQuery.isSuccess,
    refetch: baseQuery.refetch,
    status: baseQuery.status,
    internal: {
      dataUpdatedAt: baseQuery.dataUpdatedAt,
      errorUpdatedAt: baseQuery.errorUpdatedAt,
      failureCount: baseQuery.failureCount,
      isFetchedAfterMount: baseQuery.isFetchedAfterMount,
      isLoadingError: baseQuery.isLoadingError,
      isPaused: baseQuery.isPaused,
      isPlaceholderData: baseQuery.isPlaceholderData,
      isPreviousData: baseQuery.isPreviousData,
      isRefetchError: baseQuery.isRefetchError,
      isStale: baseQuery.isStale,
      remove: baseQuery.remove,
    },
  }

  // Handle result property usage tracking
  return !baseQuery.defaultedOptions.notifyOnChangeProps
    ? trackResult(result, baseQuery.observer)
    : result
}
