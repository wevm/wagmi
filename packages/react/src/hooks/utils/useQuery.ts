import * as React from 'react'
import { useSyncExternalStore } from 'use-sync-external-store/shim'

import {
  QueryFunction,
  QueryKey,
  QueryObserver,
  QueryObserverResult,
  UseBaseQueryOptions,
  UseQueryOptions,
  notifyManager,
  useIsHydrating,
  useQueryClient,
  useQueryErrorResetBoundary,
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
  TQueryFnData,
  TError,
  TData,
  TQueryData,
  TQueryKey extends QueryKey,
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options_?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    'queryKey' | 'queryFn'
  >,
) {
  const options = { queryKey, queryFn, ...options_ } as UseBaseQueryOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryData,
    TQueryKey
  >
  const queryClient = useQueryClient({ context: options.context })
  const isHydrating = useIsHydrating()
  const errorResetBoundary = useQueryErrorResetBoundary()
  const defaultedOptions = queryClient.defaultQueryOptions(options)

  // Make sure results are optimistically set in fetching state before subscribing or updating options
  defaultedOptions._optimisticResults = isHydrating
    ? 'isHydrating'
    : 'optimistic'

  // Include callbacks in batch renders
  if (defaultedOptions.onError) {
    defaultedOptions.onError = notifyManager.batchCalls(
      defaultedOptions.onError,
    )
  }

  if (defaultedOptions.onSuccess) {
    defaultedOptions.onSuccess = notifyManager.batchCalls(
      defaultedOptions.onSuccess,
    )
  }

  if (defaultedOptions.onSettled) {
    defaultedOptions.onSettled = notifyManager.batchCalls(
      defaultedOptions.onSettled,
    )
  }

  if (defaultedOptions.suspense) {
    // Always set stale time when using suspense to prevent
    // fetching again when directly mounting after suspending
    if (typeof defaultedOptions.staleTime !== 'number') {
      defaultedOptions.staleTime = 1000
    }
  }

  if (defaultedOptions.suspense || defaultedOptions.useErrorBoundary) {
    // Prevent retrying failed query if the error boundary has not been reset yet
    if (!errorResetBoundary.isReset()) {
      defaultedOptions.retryOnMount = false
    }
  }

  const [observer] = React.useState(
    () =>
      new QueryObserver<TQueryFnData, TError, TData, TQueryData, TQueryKey>(
        queryClient,
        defaultedOptions,
      ),
  )

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
    isLoading,
    isLoadingError,
    isPaused,
    isPlaceholderData,
    isPreviousData,
    isRefetchError,
    isStale,
    remove,
  } = observer.getOptimisticResult(defaultedOptions)

  useSyncExternalStore(
    React.useCallback(
      (onStoreChange) =>
        isHydrating
          ? () => undefined
          : observer.subscribe(notifyManager.batchCalls(onStoreChange)),
      [observer, isHydrating],
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult(),
  )

  React.useEffect(() => {
    errorResetBoundary.clearReset()
  }, [errorResetBoundary])

  React.useEffect(() => {
    // Do not notify on updates because of changes in the options because
    // these changes should already be reflected in the optimistic result.
    observer.setOptions(defaultedOptions, { listeners: false })
  }, [defaultedOptions, observer])

  // Handle suspense
  if (defaultedOptions.suspense && isLoading && isFetching && !isHydrating) {
    throw observer
      .fetchOptimistic(defaultedOptions)
      .then(({ data }) => {
        defaultedOptions.onSuccess?.(data as TData)
        defaultedOptions.onSettled?.(data, null)
      })
      .catch((error) => {
        errorResetBoundary.clearReset()
        defaultedOptions.onError?.(error)
        defaultedOptions.onSettled?.(undefined, error)
      })
  }

  // Handle error boundary
  if (
    isError &&
    !errorResetBoundary.isReset() &&
    !isFetching &&
    shouldThrowError(defaultedOptions.useErrorBoundary, [
      error,
      observer.getCurrentQuery(),
    ])
  ) {
    throw error
  }

  const isIdle = status === 'loading' && fetchStatus === 'idle'
  const isLoading_ = status === 'loading' && fetchStatus === 'fetching'

  const result: QueryResult<TData, TError> = {
    data,
    error,
    isIdle,
    isError,
    isFetched,
    isFetching,
    isLoading: isLoading_,
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

  // Handle result property usage tracking
  return !defaultedOptions.notifyOnChangeProps
    ? trackResult(result, observer)
    : result
}

function trackResult<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  result: QueryResult<TData, TError>,
  observer: QueryObserver<TQueryFnData, TError, TData, TQueryData, TQueryKey>,
): QueryResult<TData, TError> {
  const trackedResult = {} as QueryResult<TData, TError>

  Object.keys(result).forEach((key) => {
    Object.defineProperty(trackedResult, key, {
      configurable: false,
      enumerable: true,
      get: () => {
        // @ts-expect-error – aware we are mutating private `trackedProps` property.
        observer.trackedProps.add(key as keyof QueryResult<TData, TError>)
        return result[key as keyof QueryResult<TData, TError>]
      },
    })
  })

  return trackedResult
}

function shouldThrowError<T extends (...args: any[]) => boolean>(
  _useErrorBoundary: boolean | T | undefined,
  params: Parameters<T>,
): boolean {
  // Allow useErrorBoundary function to override throwing behavior on a per-error basis
  if (typeof _useErrorBoundary === 'function') {
    return _useErrorBoundary(...params)
  }

  return !!_useErrorBoundary
}
