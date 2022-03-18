import { useQuery } from 'react-query'
import { FetchEnsAvatarResult, fetchEnsAvatar } from '@wagmi/core'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { useChainId } from '../utils'

export type UseEnsAvatarArgs = {
  /** Address or ENS name */
  addressOrName?: string
}

export type UseEnsLookupConfig = QueryConfig<FetchEnsAvatarResult, Error>

export const queryKey = ({
  addressOrName,
  chainId,
}: {
  addressOrName?: UseEnsAvatarArgs['addressOrName']
  chainId?: number
}) => [{ entity: 'ensAvatar', addressOrName, chainId }] as const

const queryFn = ({
  queryKey: [{ addressOrName }],
}: QueryFunctionArgs<typeof queryKey>) => {
  if (!addressOrName) throw new Error('QueryKey missing addressOrName')
  return fetchEnsAvatar({ addressOrName })
}

export function useEnsAvatar({
  addressOrName,
  cacheTime,
  enabled = true,
  keepPreviousData,
  select,
  staleTime = Infinity,
  suspense,
  onError,
  onSettled,
  onSuccess,
}: UseEnsAvatarArgs & UseEnsLookupConfig = {}) {
  const chainId = useChainId()
  return useQuery(queryKey({ addressOrName, chainId }), queryFn, {
    cacheTime,
    enabled: Boolean(enabled && addressOrName && chainId),
    keepPreviousData,
    select,
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess,
  })
}
