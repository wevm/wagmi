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
  const {
    data,
    dataUpdatedAt,
    error,
    errorUpdatedAt,
    defaultedOptions,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    failureCount,
    fetchStatus,
    isIdle,
    isError,
    isFetched,
    isFetchedAfterMount,
    isFetching,
    isLoading,
    isLoadingError,
    isPaused,
    isPlaceholderData,
    isPreviousData,
    isRefetchError,
    isRefetching,
    isStale,
    isSuccess,
    observer,
    refetch,
    remove,
    status,
  } = useBaseQuery(
    parsedOptions,
    InfiniteQueryObserver as typeof QueryObserver,
  ) as any

  const result = {
    data,
    error,
    fetchNextPage,
    fetchStatus,
    hasNextPage,
    isError,
    isFetched,
    isFetching,
    isFetchingNextPage,
    isIdle,
    isLoading,
    isRefetching,
    isSuccess,
    refetch,
    status,
    internal: {
      dataUpdatedAt,
      errorUpdatedAt,
      failureCount,
      isFetchedAfterMount,
      isLoadingError,
      isPaused,
      isPlaceholderData,
      isPreviousData,
      isRefetchError,
      isStale,
      remove,
    },
  }

  // Handle result property usage tracking
  return !defaultedOptions.notifyOnChangeProps
    ? trackResult(result, observer)
    : result
}
