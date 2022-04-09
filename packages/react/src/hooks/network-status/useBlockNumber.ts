import * as React from 'react'
import { FetchBlockNumberResult, fetchBlockNumber } from '@wagmi/core'
import { useQueryClient } from 'react-query'

import { QueryConfig } from '../../types'
import { useProvider, useWebSocketProvider } from '../providers'
import { useChainId, useQuery } from '../utils'

export type UseBlockNumberConfig = QueryConfig<
  FetchBlockNumberResult,
  Error
> & {
  /** Subscribe to changes */
  watch?: boolean
}

export const queryKey = ({ chainId }: { chainId?: number }) =>
  [{ entity: 'blockNumber', chainId }] as const

const queryFn = () => {
  return fetchBlockNumber()
}

export function useBlockNumber({
  cacheTime = 0,
  enabled = true,
  staleTime,
  suspense,
  watch = false,
  onError,
  onSettled,
  onSuccess,
}: UseBlockNumberConfig = {}) {
  const chainId = useChainId()
  const provider = useProvider()
  const webSocketProvider = useWebSocketProvider()
  const queryClient = useQueryClient()

  React.useEffect(() => {
    if (!watch) return

    const listener = (blockNumber: number) => {
      // Just to be safe in case the provider implementation
      // calls the event callback after .off() has been called
      queryClient.setQueryData(queryKey({ chainId }), blockNumber)
    }

    const provider_ = webSocketProvider ?? provider
    provider_.on('block', listener)

    return () => {
      provider_.off('block', listener)
    }
  }, [chainId, provider, queryClient, watch, webSocketProvider])

  return useQuery(queryKey({ chainId }), queryFn, {
    cacheTime,
    enabled,
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess,
  })
}
