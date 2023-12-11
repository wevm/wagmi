import {
  type DefaultError,
  type InfiniteQueryObserverOptions,
  type MutateOptions,
  type QueryKey,
  type QueryMeta,
} from '@tanstack/query-core'

import { type Evaluate, type Omit } from '../types/utils.js'

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
    // TS2742: `QueryFunctionContext` not exported from `@tanstack/query-core`
    queryFn?(context: {
      queryKey: queryKey
      signal: AbortSignal
      pageParam: pageParam
      direction: 'forward' | 'backward'
      meta: QueryMeta | undefined
    }): ReturnType<NonNullable<options['queryFn']>>
  }
>

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
