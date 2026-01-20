import {
  type DefaultError,
  type MutateFunction,
  type MutationObserverOptions,
  type QueryKey,
  type UseMutationReturnType as tanstack_UseMutationReturnType,
  type UseQueryReturnType as tanstack_UseQueryReturnType,
  useQuery as tanstack_useQuery,
  type UseQueryOptions,
  useMutation,
} from '@tanstack/vue-query'
import type {
  Compute,
  ExactPartial,
  Omit,
  UnionStrictOmit,
} from '@wagmi/core/internal'
import { hashFn } from '@wagmi/core/query'
import { computed, type MaybeRef, unref } from 'vue'

import type { DeepMaybeRef, DeepUnwrapRef } from '../types/ref.js'

export { useMutation }

export type UseMutationParameters<
  data = unknown,
  error = Error,
  variables = void,
  context = unknown,
> = Compute<
  DeepMaybeRef<
    Omit<
      DeepUnwrapRef<
        MutationObserverOptions<data, error, Compute<variables>, context>
      >,
      'mutationFn' | 'mutationKey' | 'throwOnError'
    >
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
    tanstack_UseMutationReturnType<data, error, variables, context>,
    'mutate' | 'mutateAsync'
  > & {
    mutate: mutate
    mutateAsync: mutateAsync
  }
>

////////////////////////////////////////////////////////////////////////////////

// Adding some basic customization.
// Ideally we don't have this function, but `import('@tanstack/vue-query').useQuery` currently has some quirks where it is super hard to
// pass down the inferred `initialData` type because of it's discriminated overload in the on `useQuery`.
export function useQuery<queryFnData, error, data, queryKey extends QueryKey>(
  parameters: MaybeRef<
    UseQueryParameters<queryFnData, error, data, queryKey> & {
      queryKey: QueryKey
    }
  >,
): UseQueryReturnType<data, error> {
  const options = computed(() => ({
    ...(unref(parameters) as any),
    queryKeyHashFn: hashFn,
  }))
  const result = tanstack_useQuery(options) as UseQueryReturnType<data, error>
  result.queryKey = unref(options).queryKey as QueryKey
  return result
}

export type UseQueryParameters<
  queryFnData = unknown,
  error = DefaultError,
  data = queryFnData,
  queryKey extends QueryKey = QueryKey,
> = Compute<
  DeepMaybeRef<
    ExactPartial<
      Omit<
        DeepUnwrapRef<
          UseQueryOptions<queryFnData, error, data, queryFnData, queryKey>
        >,
        'initialData'
      >
    > & {
      // Fix `initialData` type
      initialData?:
        | DeepUnwrapRef<
            UseQueryOptions<queryFnData, error, data, queryFnData, queryKey>
          >['initialData']
        | undefined
    }
  >
>

export type UseQueryReturnType<data = unknown, error = DefaultError> = Compute<
  tanstack_UseQueryReturnType<data, error> & {
    queryKey: QueryKey
  }
>
