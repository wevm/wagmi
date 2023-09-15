import type {
  DefaultError,
  InfiniteQueryObserverOptions,
  QueryKey,
  QueryMeta,
} from '@tanstack/query-core'

import type { Evaluate, Omit } from '../types/utils.js'

export type InfiniteQueryOptions<
  queryFnData = unknown,
  error = DefaultError,
  data = queryFnData,
  queryData = queryFnData,
  queryKey extends QueryKey = QueryKey,
  pageParam = unknown,
> = Evaluate<
  Omit<
    InfiniteQueryObserverOptions<
      queryFnData,
      error,
      data,
      queryData,
      queryKey,
      pageParam
    >,
    'queryFn' | 'getNextPageParam'
  > & {
    queryFn?(context: {
      queryKey: queryKey
      signal: AbortSignal
      pageParam: pageParam
      direction: 'forward' | 'backward'
      meta: QueryMeta | undefined
    }): queryFnData | Promise<queryFnData>
    getNextPageParam(
      lastPage: queryFnData,
      allPages: queryFnData[],
      lastPageParam: pageParam,
      allPageParams: pageParam[],
    ): pageParam | undefined | null
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
        | Evaluate<
            import('@tanstack/query-core').MutateOptions<
              data,
              error,
              variables,
              context
            >
          >
        | undefined,
    ) => Promise<data>
  : (
      variables: variables,
      options?:
        | Evaluate<
            import('@tanstack/query-core').MutateOptions<
              data,
              error,
              variables,
              context
            >
          >
        | undefined,
    ) => Promise<data>

export type ScopeKeyParameter = { scopeKey?: string | undefined }
