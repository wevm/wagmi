import { useQuery } from 'react-query'
import { FetchEnsNameResult, fetchEnsName } from '@wagmi/core'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { hashPrefix } from '../../constants'
import { useChainId } from '../utils'

export type UseEnsLookupArgs = {
  /** Address to use for looking up ENS name */
  address?: string
}

export type UseEnsLookupConfig = QueryConfig<FetchEnsNameResult, Error>

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

export const useEnsLookup = (
  { address }: UseEnsLookupArgs,
  {
    cacheTime,
    enabled = true,
    staleTime = Infinity,
    onError,
    onSettled,
    onSuccess,
  }: UseEnsLookupConfig = {},
) => {
  const chainId = useChainId()

  return useQuery(ensLookupQueryKey({ address, chainId }), ensLookupQueryFn, {
    cacheTime,
    enabled: Boolean(enabled && address && chainId),
    queryKeyHashFn,
    staleTime,
    onError,
    onSettled,
    onSuccess,
  })
}
