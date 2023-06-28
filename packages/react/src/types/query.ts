import {
  type DefaultError,
  type QueryKey,
  useQuery as useQuery_,
} from '@tanstack/react-query'
import { type Evaluate, type Omit } from '@wagmi/core/internal'

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
  Omit<
    import('@tanstack/react-query').UseQueryOptions<
      queryFnData,
      error,
      data,
      queryKey
    >,
    | 'initialData'
    | 'queryFn'
    | 'queryKey'
    | 'queryKeyHashFn'
    | 'suspense'
    | 'throwOnError'
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

// TODO: Remove
// Ideally we don't have this file, but `useQuery` currently has some quirks where it is super hard to
// pass down the inferred `initialData` type because of it's discriminated overload in the on `useQuery`.
export function useQuery<queryFnData, error, data, queryKey extends QueryKey>(
  args: UseQueryParameters<queryFnData, error, data, queryKey>,
): UseQueryResult<data, error> {
  return useQuery_(args as any)
}
