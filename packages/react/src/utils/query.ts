import {
  type DefaultError,
  type QueryKey,
  replaceEqualDeep,
  useQuery as useQuery_,
} from '@tanstack/react-query'
import {
  type Evaluate,
  type ExactPartial,
  type Omit,
  deepEqual,
} from '@wagmi/core/internal'
import { hashFn } from '@wagmi/core/query'

export type UseMutationOptions<
  data = unknown,
  error = Error,
  variables = void,
  context = unknown,
> = Evaluate<
  Omit<
    import('@tanstack/react-query').UseMutationOptions<
      data,
      error,
      Evaluate<variables>,
      context
    >,
    'mutationFn' | 'mutationKey' | 'throwOnError'
  >
>

export type UseMutationResult<
  data = unknown,
  error = Error,
  variables = void,
  context = unknown,
> = Evaluate<
  Omit<
    import('@tanstack/react-query').UseMutationResult<
      data,
      error,
      variables,
      context
    >,
    'mutate' | 'mutateAsync'
  >
>

export type UseQueryParameters<
  queryFnData = unknown,
  error = DefaultError,
  data = queryFnData,
  queryKey extends QueryKey = QueryKey,
> = Evaluate<
  ExactPartial<
    Omit<
      import('@tanstack/react-query').UseQueryOptions<
        queryFnData,
        error,
        data,
        queryKey
      >,
      | 'initialData'
      | 'queryFn'
      | 'queryHash'
      | 'queryKey'
      | 'queryKeyHashFn'
      | 'suspense'
      | 'throwOnError'
    >
  > & {
    // Fix `initialData` type
    initialData?: import('@tanstack/react-query').UseQueryOptions<
      queryFnData,
      error,
      data,
      queryKey
    >['initialData']
  }
>

export type UseQueryResult<
  data = unknown,
  error = DefaultError,
> = import('@tanstack/react-query').UseQueryResult<data, error>

// Ideally we don't have this function, but `useQuery` currently has some quirks where it is super hard to
// pass down the inferred `initialData` type because of it's discriminated overload in the on `useQuery`.
export function useQuery<queryFnData, error, data, queryKey extends QueryKey>(
  parameters: UseQueryParameters<queryFnData, error, data, queryKey>,
): UseQueryResult<data, error> {
  return useQuery_({
    ...(parameters as any),
    queryKeyHashFn: hashFn, // for bigint support
  }) as UseQueryResult<data, error>
}

export function structuralSharing<data>(
  oldData: data | undefined,
  newData: data,
): data {
  if (deepEqual(oldData, newData)) return oldData as data
  return replaceEqualDeep(oldData, newData)
}
