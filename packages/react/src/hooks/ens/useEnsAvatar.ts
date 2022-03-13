import { useQuery } from 'react-query'
import { FetchEnsAvatarResult, fetchEnsAvatar } from '@wagmi/core'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { useChainId } from '../utils'

export type UseEnsLookupConfig = QueryConfig<FetchEnsAvatarResult, Error> & {
  /** Address or ENS name to use for looking up ENS avatar */
  addressOrName?: string
}

export const queryKey = ({
  addressOrName,
  chainId,
}: {
  addressOrName?: UseEnsLookupConfig['addressOrName']
  chainId?: number
}) => [{ entity: 'ensAvatar', addressOrName, chainId }] as const

const queryFn = ({
  queryKey: [{ addressOrName }],
}: QueryFunctionArgs<typeof queryKey>) => {
  if (!addressOrName) throw new Error('QueryKey missing addressOrName')
  return fetchEnsAvatar({ addressOrName })
}

export const useEnsAvatar = ({
  addressOrName,
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
  } = useQuery(queryKey({ addressOrName, chainId }), queryFn, {
    cacheTime,
    enabled: Boolean(enabled && addressOrName && chainId),
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
