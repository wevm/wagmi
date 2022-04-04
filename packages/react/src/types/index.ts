import {
  QueryFunctionContext,
  UseMutationOptions,
  UseQueryOptions,
} from 'react-query'

export type QueryFunctionArgs<T extends (...args: any) => any> =
  QueryFunctionContext<ReturnType<T>>

export type QueryConfig<Data, Error> = {
  /**
   * The time in milliseconds that unused/inactive cache data remains in memory.
   * If set to Infinity, will disable garbage collection.
   */
  cacheTime?: UseQueryOptions<Data, Error>['cacheTime']
  /** Set this to `false` to disable this query from automatically running */
  enabled?: UseQueryOptions<Data, Error>['enabled']
  /**
   * The time in milliseconds after data is considered stale.
   * If set to Infinity, the data will never be considered stale.
   */
  staleTime?: UseQueryOptions<Data, Error>['staleTime']
  /**
   * If set to `true`, the query will suspend when `status === 'loading'`
   * and throw errors when `status === 'error'`.
   */
  suspense?: UseQueryOptions<Data, Error>['suspense']
  /** Function to invoke when an error is thrown while fetching new data. */
  onError?: UseQueryOptions<Data, Error>['onError']
  /** Function to invoke when fetching is settled (either successfully fetched, or an error has thrown). */
  onSettled?: UseQueryOptions<Data, Error>['onSettled']
  /** Function to invoke when fetching new data is successful. */
  onSuccess?: UseQueryOptions<Data, Error>['onSuccess']
}

export type MutationConfig<Data, Error, Variables = void> = {
  /** Function fires if mutation encounters error */
  onError?: UseMutationOptions<Data, Error, Variables>['onError']
  /**
   * Function fires before mutation function and is passed same variables mutation function would receive.
   * Value returned from this function will be passed to both onError and onSettled functions in event of a mutation failure.
   */
  onMutate?: UseMutationOptions<Data, Error, Variables>['onMutate']
  /** Function fires when mutation is either successfully fetched or encounters error */
  onSettled?: UseMutationOptions<Data, Error, Variables>['onSettled']
  /** Function fires when mutation is successful and will be passed the mutation's result */
  onSuccess?: UseMutationOptions<Data, Error, Variables>['onSuccess']
}
