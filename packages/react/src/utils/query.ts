import {
  type DefaultError,
  type QueryKey,
  type UseMutationOptions,
  type UseMutationResult,
  type UseQueryOptions,
  type UseQueryResult,
  replaceEqualDeep,
  useQuery as tanstack_useQuery,
} from '@tanstack/react-query'
import {
  type Evaluate,
  type ExactPartial,
  type Omit,
  deepEqual,
} from '@wagmi/core/internal'
import { hashFn } from '@wagmi/core/query'

export type UseMutationParameters<
  data = unknown,
  error = Error,
  variables = void,
  context = unknown,
> = Evaluate<
  Omit<
    UseMutationOptions<data, error, Evaluate<variables>, context>,
    'mutationFn' | 'mutationKey' | 'throwOnError'
  >
>

export type UseMutationReturnType<
  data = unknown,
  error = Error,
  variables = void,
  context = unknown,
> = Evaluate<
  Omit<
    UseMutationResult<data, error, variables, context>,
    'mutate' | 'mutateAsync'
  >
>

////////////////////////////////////////////////////////////////////////////////

export type UseQueryParameters<
  queryFnData = unknown,
  error = DefaultError,
  data = queryFnData,
  queryKey extends QueryKey = QueryKey,
> = Evaluate<
  ExactPartial<
    Omit<
      UseQueryOptions<queryFnData, error, data, queryKey>,
      | 'initialData'
      | 'queryFn'
      | 'queryHash'
      | 'queryKey'
      | 'queryKeyHashFn'
      | 'throwOnError'
    >
  > & {
    // Fix `initialData` type
    initialData?: UseQueryOptions<
      queryFnData,
      error,
      data,
      queryKey
    >['initialData']
  }
>

export type UseQueryReturnType<data = unknown, error = DefaultError> = Evaluate<
  UseQueryResult<data, error> & {
    queryKey: QueryKey
  }
>

// Adding some basic customization.
// Ideally we don't have this function, but `import('@tanstack/react-query').useQuery` currently has some quirks where it is super hard to
// pass down the inferred `initialData` type because of it's discriminated overload in the on `useQuery`.
export function useQuery<queryFnData, error, data, queryKey extends QueryKey>(
  parameters: UseQueryParameters<queryFnData, error, data, queryKey> & {
    queryKey: QueryKey
  },
): UseQueryReturnType<data, error> {
  const result = tanstack_useQuery({
    ...(parameters as any),
    queryKeyHashFn: hashFn, // for bigint support
  }) as UseQueryReturnType<data, error>
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
