import { useQuery } from 'react-query'
import { FetchEnsNameResult, fetchEnsName } from '@wagmi/core'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { hashPrefix } from '../../constants'
import { useChainId } from '../utils'

export type UseEnsLookupConfig = QueryConfig<FetchEnsNameResult, Error> & {
  /** Address to use for looking up ENS name */
  address?: string
}

export const ensLookupQueryKey = ({
  address,
  chainId,
}: {
  address?: string
  chainId?: number
}) => [{ entity: 'ensLookup', address, chainId }] as const

const ensLookupQueryFn = ({
  queryKey: [{ address }],
}: QueryFunctionArgs<typeof ensLookupQueryKey>) => {
  if (!address) throw new Error('QueryKey missing address')
  return fetchEnsName({ address })
}

const queryKeyHashFn = ([{ address, chainId, entity }]: ReturnType<
  typeof ensLookupQueryKey
>) => `${hashPrefix}:${entity}:${JSON.stringify({ address, chainId })}`

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
  } = useQuery(ensLookupQueryKey({ address, chainId }), ensLookupQueryFn, {
    cacheTime,
    enabled: Boolean(enabled && address && chainId),
    queryKeyHashFn,
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
