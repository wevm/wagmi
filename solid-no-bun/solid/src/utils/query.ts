import {
  type DefaultError,
  type QueryKey,
  type CreateInfiniteQueryOptions,
  type CreateInfiniteQueryResult,
  type CreateMutationOptions,
  type CreateMutationResult,
  type CreateQueryOptions,
  type CreateQueryResult,
  replaceEqualDeep,
  createInfiniteQuery as tanstack_createInfiniteQuery,
  createQuery as tanstack_createQuery,
} from '@tanstack/solid-query'
import {
  type Evaluate,
  type ExactPartial,
  deepEqual,
} from '@wagmi/core/internal'
import { hashFn } from '@wagmi/core/query'

// TODO: Wagmi's Omit breaks the types.
// import type { Omit } from '@wagmi/core/internal'

export type CreateMutationParameters<
  data = unknown,
  error = Error,
  variables = void,
  context = unknown,
> = Evaluate<
  Omit<
    CreateMutationOptions<data, error, Evaluate<variables>, context>,
    'mutationFn' | 'mutationKey' | 'throwOnError'
  >
>

export type CreateMutationReturnType<
  data = unknown,
  error = Error,
  variables = void,
  context = unknown,
> = Evaluate<
  Omit<
    CreateMutationResult<data, error, variables, context>,
    'mutate' | 'mutateAsync'
  >
>

////////////////////////////////////////////////////////////////////////////////

export type CreateQueryParameters<
  queryFnData = unknown,
  error = DefaultError,
  data = queryFnData,
  queryKey extends QueryKey = QueryKey,
> = Evaluate<
  ExactPartial<
    Omit<CreateQueryOptions<queryFnData, error, data, queryKey>, 'initialData'>
  > & {
    // Fix `initialData` type
    initialData?:
      | CreateQueryOptions<queryFnData, error, data, queryKey>['initialData']
      | undefined
  }
>

export type CreateQueryReturnType<data = unknown, error = DefaultError> = Evaluate<
  CreateQueryResult<data, error> & {
    queryKey: QueryKey
  }
>

// Adding some basic customization.
// Ideally we don't have this function, but `import('@tanstack/react-query').useQuery` currently has some quirks where it is super hard to
// pass down the inferred `initialData` type because of it's discriminated overload in the on `useQuery`.
export function createQuery<queryFnData, error, data, queryKey extends QueryKey>(
  parameters: CreateQueryParameters<queryFnData, error, data, queryKey> & {
    queryKey: QueryKey
  },
): CreateQueryReturnType<data, error> {
  const result = tanstack_createQuery({
    ...(parameters as any),
    queryKeyHashFn: hashFn, // for bigint support
  }) as CreateQueryReturnType<data, error>
  result.queryKey = parameters.queryKey
  return result
}

////////////////////////////////////////////////////////////////////////////////

export type CreateInfiniteQueryParameters<
  queryFnData = unknown,
  error = DefaultError,
  data = queryFnData,
  queryKey extends QueryKey = QueryKey,
  pageParam = unknown,
> = Evaluate<
  Omit<
    CreateInfiniteQueryOptions<
      queryFnData,
      error,
      data,
      queryKey,
      pageParam
    >,
    'initialData'
  > & {
    // Fix `initialData` type
    initialData?:
      | CreateInfiniteQueryOptions<
          queryFnData,
          error,
          data,
          queryKey
        >['initialData']
      | undefined
  }
>

export type CreateInfiniteQueryReturnType<
  data = unknown,
  error = DefaultError,
> = CreateInfiniteQueryResult<data, error> & {
  queryKey: QueryKey
}

// Adding some basic customization.
export function createInfiniteQuery<
  queryFnData,
  error,
  data,
  queryKey extends QueryKey,
>(
  parameters: CreateInfiniteQueryParameters<queryFnData, error, data, queryKey> & {
    queryKey: QueryKey
  },
): CreateInfiniteQueryReturnType<data, error> {
  const result = tanstack_createInfiniteQuery({
    ...(parameters as any),
    queryKeyHashFn: hashFn, // for bigint support
  }) as CreateInfiniteQueryReturnType<data, error>
  result.queryKey = parameters.queryKey
  return result
}

////////////////////////////////////////////////////////////////////////////////

export function structuralSharing<data>(
  oldData: data | undefined,
  newData: data,
): data {
  if (deepEqual(oldData, newData)) return oldData as data
  return replaceEqualDeep(oldData, newData)
}
