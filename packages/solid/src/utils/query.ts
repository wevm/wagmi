import {
  type DefaultError,
  type MutateFunction,
  type QueryKey,
  type SolidInfiniteQueryOptions,
  type SolidMutationOptions,
  type SolidQueryOptions,
  // TODO: import use___ once solid-query version is updated
  createInfiniteQuery as tanstack_useInfiniteQuery,
  createQuery as tanstack_useQuery,
  type CreateInfiniteQueryResult as UseInfiniteQueryResult,
  type CreateMutationResult as UseMutationResult,
  type CreateQueryResult as UseQueryResult,
  createMutation as useMutation,
} from '@tanstack/solid-query'
import type {
  Compute,
  ExactPartial,
  Omit,
  UnionStrictOmit,
} from '@wagmi/core/internal'
import { hashFn } from '@wagmi/core/query'
import { type Accessor, mergeProps } from 'solid-js'

export type SolidMutationParameters<
  data = unknown,
  error = Error,
  variables = void,
  context = unknown,
> = Compute<
  Omit<
    SolidMutationOptions<data, error, Compute<variables>, context>,
    'mutationFn' | 'mutationKey' | 'throwOnError'
  >
>

export type UseMutationReturnType<
  data = unknown,
  error = Error,
  variables = void,
  context = unknown,
  mutate = MutateFunction,
  mutateAsync = MutateFunction,
> = Compute<
  UnionStrictOmit<
    UseMutationResult<data, error, variables, context>,
    'mutate' | 'mutateAsync'
  > & {
    mutate: mutate
    mutateAsync: mutateAsync
  }
>

export { useMutation }

////////////////////////////////////////////////////////////////////////////////

export type SolidQueryParameters<
  queryFnData = unknown,
  error = DefaultError,
  data = queryFnData,
  queryKey extends QueryKey = QueryKey,
> = Compute<
  ExactPartial<
    Omit<SolidQueryOptions<queryFnData, error, data, queryKey>, 'initialData'>
  > & {
    // Fix `initialData` type
    initialData?:
      | SolidQueryOptions<queryFnData, error, data, queryKey>['initialData']
      | undefined
  }
>

export type UseQueryReturnType<data = unknown, error = DefaultError> = Compute<
  UseQueryResult<data, error> & {
    queryKey: QueryKey
  }
>

// Adding some basic customization.
// Ideally we don't have this function, but `import('@tanstack/react-query').useQuery` currently has some quirks where it is super hard to
// pass down the inferred `initialData` type because of it's discriminated overload in the on `useQuery`.
export function useQuery<queryFnData, error, data, queryKey extends QueryKey>(
  parameters: Accessor<
    SolidQueryParameters<queryFnData, error, data, queryKey> & {
      queryKey: QueryKey
    }
  >,
): UseQueryReturnType<data, error> {
  const result = tanstack_useQuery(() => ({
    ...(parameters() as any),
    queryKeyHashFn: hashFn, // for bigint support
  }))
  return mergeProps(result, {
    get queryKey() {
      return parameters().queryKey
    },
  }) as UseQueryReturnType<data, error>
}

////////////////////////////////////////////////////////////////////////////////

export type SolidInfiniteQueryParameters<
  queryFnData = unknown,
  error = DefaultError,
  data = queryFnData,
  queryData = queryFnData,
  queryKey extends QueryKey = QueryKey,
  pageParam = unknown,
> = Compute<
  Omit<
    SolidInfiniteQueryOptions<
      queryFnData,
      error,
      data,
      queryData,
      queryKey,
      pageParam
    >,
    'initialData'
  > & {
    // Fix `initialData` type
    initialData?:
      | SolidInfiniteQueryOptions<
          queryFnData,
          error,
          data,
          queryKey
        >['initialData']
      | undefined
  }
>

export type UseInfiniteQueryReturnType<
  data = unknown,
  error = DefaultError,
> = UseInfiniteQueryResult<data, error> & {
  queryKey: QueryKey
}

// Adding some basic customization.
export function useInfiniteQuery<
  queryFnData,
  error,
  data,
  queryData,
  queryKey extends QueryKey,
  pageParam = unknown,
>(
  parameters: Accessor<
    SolidInfiniteQueryParameters<
      queryFnData,
      error,
      data,
      queryData,
      queryKey,
      pageParam
    > & {
      queryKey: QueryKey
    }
  >,
): UseInfiniteQueryReturnType<data, error> {
  const result = tanstack_useInfiniteQuery(() => ({
    ...(parameters() as any),
    queryKeyHashFn: hashFn, // for bigint support
  }))
  return mergeProps(
    result,
    parameters().queryKey,
  ) as unknown as UseInfiniteQueryReturnType<data, error>
}
