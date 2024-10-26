import type { RuneParameters, RuneReturnType } from '$lib/types.js'
import {
  type CreateQueryOptions,
  type CreateQueryResult,
  type DefaultError,
  type QueryKey,
  createQuery as tanstack_createQuery,
} from '@tanstack/svelte-query'
import type { Compute, ExactPartial } from '@wagmi/core/internal'
import { hashFn } from '@wagmi/core/query'

export type CreateQueryParameters<
  queryFnData = unknown,
  error = DefaultError,
  data = queryFnData,
  queryKey extends QueryKey = QueryKey,
> = Compute<
  ExactPartial<
    Omit<CreateQueryOptions<queryFnData, error, data, queryKey>, 'initialData'>
  > & {
    // Fix `initialData` type
    initialData?:
      | CreateQueryOptions<queryFnData, error, data, queryKey>['initialData']
      | undefined
  }
>

export type CreateQueryReturnType<
  data = unknown,
  error = DefaultError,
> = Compute<
  CreateQueryResult<data, error> & {
    queryKey: QueryKey
  }
>

export function createQuery<
  queryFnData,
  error,
  data,
  queryKey extends QueryKey,
>(
  parameters: RuneParameters<
    CreateQueryParameters<queryFnData, error, data, queryKey> & {
      queryKey: QueryKey
    }
  >,
): RuneReturnType<CreateQueryReturnType<data, error>> {
  const result = tanstack_createQuery(() => ({
    ...parameters(),
    queryKeyHashFn: hashFn, // for bigint support
  }))
  const resultWithQueryKey = $derived({
    ...result,
    queryKey: parameters().queryKey,
  })
  return () => resultWithQueryKey
}
