import { useQuery } from 'react-query'
import { FetchEnsNameResult, fetchEnsName } from '@wagmi/core'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { useChainId } from '../utils'

export type UseEnsLookupConfig = QueryConfig<FetchEnsNameResult, Error> & {
  /** Address to use for looking up ENS name */
  address?: string
}

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

export const useEnsLookup = ({
  address,
  cacheTime,
  enabled = true,
  staleTime = Infinity,
  onError,
  onSettled,
  onSuccess,
}: UseEnsLookupConfig = {}) => {
  const chainId = useChainId()
  const {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    refetch,
    status,
  } = useQuery(queryKey({ address, chainId }), queryFn, {
    cacheTime,
    enabled: Boolean(enabled && address && chainId),
    staleTime,
    onError,
    onSettled,
    onSuccess,
  })

  return {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    refetch,
    status,
  } as const
}
