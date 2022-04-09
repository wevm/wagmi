import {
  QueryFunction,
  QueryKey,
  QueryObserverResult,
  UseQueryOptions,
  useQuery as useQuery_,
} from 'react-query'

type QueryResult<TData, TError> = Pick<
  QueryObserverResult<TData, TError>,
  | 'data'
  | 'error'
  | 'isError'
  | 'isFetched'
  | 'isFetching'
  | 'isLoading'
  | 'isRefetching'
  | 'isSuccess'
  | 'refetch'
  | 'status'
  | 'fetchStatus'
> & {
  isIdle: boolean
  internal: Pick<
    QueryObserverResult,
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

export function useQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    'queryKey' | 'queryFn'
  >,
) {
  const {
    data,
    error,
    isError,
    isFetched,
    isFetching,
    isRefetching,
    isSuccess,
    refetch,
    status,
    fetchStatus,
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
  } = useQuery_<TQueryFnData, TError, TData, TQueryKey>(
    queryKey,
    queryFn,
    options,
  )

  const isIdle = status === 'loading' && fetchStatus === 'idle'
  const isLoading = status === 'loading' && fetchStatus === 'fetching'

  const result: QueryResult<TData, TError> = {
    data,
    error,
    isIdle,
    isError,
    isFetched,
    isFetching,
    isLoading,
    isRefetching,
    isSuccess,
    refetch,
    status,
    fetchStatus,
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

  return result
}
