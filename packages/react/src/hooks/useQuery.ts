// Ideally we don't have this file, but `useQuery` currently has some quirks where it is super hard to
// pass down the inferred `initialData` type because of it's discriminated overload in the on `useQuery`.

import {
  type QueryKey,
  type UseQueryResult,
  useQuery as useQuery_,
} from '@tanstack/react-query'

import type { UseQueryParameters } from '../types/query.js'

export function useQuery<queryFnData, error, data, queryKey extends QueryKey>(
  args: UseQueryParameters<queryFnData, error, data, queryKey>,
): UseQueryResult<data, error> {
  return useQuery_(args as any)
}
