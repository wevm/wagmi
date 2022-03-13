import { FetchBlockNumberResult, fetchBlockNumber } from '@wagmi/core'
import { useEffect } from 'react'
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

export const blockNumberQueryKey = () => [{ entity: 'block-number' }] as const

const blockNumberQueryFn = () => {
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
  const {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    refetch,
    status,
  } = useQuery(blockNumberQueryKey(), blockNumberQueryFn, {
    cacheTime,
    enabled,
    staleTime,
    onError,
    onSettled,
    onSuccess,
  })
  const provider = useProvider()
  const webSocketProvider = useWebSocketProvider()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!watch) return

    const listener = (blockNumber: number) => {
      // Just to be safe in case the provider implementation
      // calls the event callback after .off() has been called
      queryClient.setQueryData(blockNumberQueryKey(), blockNumber)
    }

    const provider_ = webSocketProvider ?? provider
    provider_.on('block', listener)

    return () => {
      provider_.off('block', listener)
    }
  }, [provider, queryClient, watch, webSocketProvider])

  return {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    refetch,
    status,
  }
}
