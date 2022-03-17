import { useQuery } from 'react-query'
import { FetchEnsAddressResult, fetchEnsAddress } from '@wagmi/core'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { useChainId } from '../utils'

export type UseEnsAddressArgs = {
  /** ENS name */
  name?: string
}

export type UseEnsAddressConfig = QueryConfig<FetchEnsAddressResult, Error>

export const queryKey = ({
  chainId,
  name,
}: {
  chainId?: number
  name?: string
}) => [{ entity: 'ensAddress', chainId, name }] as const

const queryFn = ({
  queryKey: [{ name }],
}: QueryFunctionArgs<typeof queryKey>) => {
  if (!name) throw new Error('QueryKey missing name')
  return fetchEnsAddress({ name })
}

/**
 * Fetches address for ENS name
 */
export function useEnsAddress({
  name,
  cacheTime,
  enabled = true,
  staleTime = Infinity,
  onError,
  onSettled,
  onSuccess,
}: UseEnsAddressArgs & UseEnsAddressConfig = {}) {
  const chainId = useChainId()
  return useQuery(queryKey({ chainId, name }), queryFn, {
    cacheTime,
    enabled: Boolean(enabled && chainId && name),
    staleTime,
    onError,
    onSettled,
    onSuccess,
  })
}
