import { UseQueryOptions, useQuery } from 'react-query'
import { FetchEnsNameResult, fetchEnsName } from '@wagmi/core'

import { QueryFunctionArgs } from '../../types'
import { hashPrefix } from '../../constants'
import { useChainId } from '../utils'

type QueryOptions = UseQueryOptions<FetchEnsNameResult, Error>

export type UseEnsLookupConfig = {
  /** Address to use for looking up ENS name */
  address?: string
  /**
   * The time in milliseconds that unused/inactive cache data remains in memory.
   * If set to Infinity, will disable garbage collection.
   */
  cacheTime?: QueryOptions['cacheTime']
  /**
   * Set this to `false` to disable this query from automatically running
   * @default true
   */
  enabled?: QueryOptions['enabled']
  /**
   * The time in milliseconds after data is considered stale.
   * If set to Infinity, the data will never be considered stale.
   * @default Infinity
   */
  staleTime?: QueryOptions['staleTime']
  /** Function fires if connect encounters error */
  onError?: QueryOptions['onError']
  /** Function fires when query is either successfully fetched or encounters error */
  onSettled?: QueryOptions['onSettled']
  /** Function fires when query successfully fetches new data or the cache is updated */
  onSuccess?: QueryOptions['onSuccess']
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
