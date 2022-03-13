import * as React from 'react'
import { FetchBlockNumberResult, fetchBlockNumber } from '@wagmi/core'
import { useQuery, useQueryClient } from 'react-query'

import { QueryConfig } from '../../types'
import { useProvider, useWebSocketProvider } from '../providers'

export type UseBlockNumberConfig = QueryConfig<
  FetchBlockNumberResult,
  Error
> & {
  /** Subscribe to changes */
  watch?: boolean
}

export const queryKey = () => [{ entity: 'blockNumber' }] as const

const queryFn = () => {
  return fetchBlockNumber()
}

export const useBlockNumber = ({
  cacheTime = 0,
  enabled = true,
  staleTime,
  onError,
  onSettled,
  onSuccess,
  watch = false,
}: UseBlockNumberConfig = {}) => {
  const provider = useProvider()
  const webSocketProvider = useWebSocketProvider()
  const queryClient = useQueryClient()

  React.useEffect(() => {
    if (!watch) return

    const listener = (blockNumber: number) => {
      // Just to be safe in case the provider implementation
      // calls the event callback after .off() has been called
      queryClient.setQueryData(queryKey(), blockNumber)
    }

    const provider_ = webSocketProvider ?? provider
    provider_.on('block', listener)

    return () => {
      provider_.off('block', listener)
    }
  }, [provider, queryClient, watch, webSocketProvider])

  return useQuery(queryKey(), queryFn, {
    cacheTime,
    enabled,
    staleTime,
    onError,
    onSettled,
    onSuccess,
  })
}
