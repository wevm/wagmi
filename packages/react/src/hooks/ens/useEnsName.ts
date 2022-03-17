import { useQuery } from 'react-query'
import { FetchEnsNameResult, fetchEnsName } from '@wagmi/core'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { useChainId } from '../utils'

export type UseEnsNameArgs = {
  /** Address */
  address?: string
}

export type UseEnsNameConfig = QueryConfig<FetchEnsNameResult, Error>

export const queryKey = ({
  address,
  chainId,
}: {
  address?: string
  chainId?: number
}) => [{ entity: 'ensName', address, chainId }] as const

const queryFn = ({
  queryKey: [{ address }],
}: QueryFunctionArgs<typeof queryKey>) => {
  if (!address) throw new Error('QueryKey missing address')
  return fetchEnsName({ address })
}

/**
 * Fetches ENS name for address
 */
export function useEnsName({
  address,
  cacheTime,
  enabled = true,
  staleTime = Infinity,
  onError,
  onSettled,
  onSuccess,
}: UseEnsNameArgs & UseEnsNameConfig = {}) {
  const chainId = useChainId()
  return useQuery(queryKey({ address, chainId }), queryFn, {
    cacheTime,
    enabled: Boolean(enabled && address && chainId),
    staleTime,
    onError,
    onSettled,
    onSuccess,
  })
}
