import type {
  DefaultError,
  InfiniteQueryObserverOptions,
  MutateOptions,
  QueryFunction,
  QueryKey,
} from '@tanstack/query-core'

import type { Evaluate, Omit } from '../types/utils.js'

export type InfiniteQueryOptions<
  queryFnData = unknown,
  error = DefaultError,
  data = queryFnData,
  queryData = queryFnData,
  queryKey extends QueryKey = QueryKey,
  pageParam = unknown,
  ///
  options extends InfiniteQueryObserverOptions<
    queryFnData,
    error,
    data,
    queryData,
    queryKey,
    pageParam
  > = InfiniteQueryObserverOptions<
    queryFnData,
    error,
    data,
    queryData,
    queryKey,
    pageParam
  >,
> = Evaluate<
  // `queryFn` doesn't pass through `pageParam` correctly
  Omit<options, 'queryFn'> & {
    queryFn?(
      context: QueryFunctionContext<queryKey, pageParam>,
    ): options['queryFn'] extends (...args: any) => any
      ? ReturnType<NonNullable<options['queryFn']>>
      : unknown
  }
>

// `QueryFunctionContext` not exported resulting in TS2742 error so grabbing from `QueryFunction`
type QueryFunctionContext<
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = never,
> = Parameters<QueryFunction<unknown, TQueryKey, TPageParam>>[0]

export type Mutate<
  data = unknown,
  error = unknown,
  variables = void,
  context = unknown,
> = (
  ...args: Parameters<MutateFn<data, error, Evaluate<variables>, context>>
) => void

export type MutateAsync<
  data = unknown,
  error = unknown,
  variables = void,
  context = unknown,
> = MutateFn<data, error, Evaluate<variables>, context>

type MutateFn<
  data = unknown,
  error = unknown,
  variables = void,
  context = unknown,
> = undefined extends variables
  ? (
      variables?: variables,
      options?:
        | Evaluate<MutateOptions<data, error, variables, context>>
        | undefined,
    ) => Promise<data>
  : (
      variables: variables,
      options?:
        | Evaluate<MutateOptions<data, error, variables, context>>
        | undefined,
    ) => Promise<data>
