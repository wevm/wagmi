import * as React from 'react'
import { useQueryClient } from 'react-query'
import {
  FetchBlockNumberArgs,
  FetchBlockNumberResult,
  fetchBlockNumber,
} from '@wagmi/core'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { useProvider, useWebSocketProvider } from '../providers'
import { useChainId, useQuery } from '../utils'

type UseBlockNumberArgs = Partial<FetchBlockNumberArgs> & {
  /** Function fires when a new block is created */
  onBlock?: (blockNumber: number) => void
  /** Subscribe to changes */
  watch?: boolean
}

export type UseBlockNumberConfig = QueryConfig<FetchBlockNumberResult, Error>

export const queryKey = ({ chainId }: { chainId?: number }) =>
  [{ entity: 'blockNumber', chainId }] as const

const queryFn = ({
  queryKey: [{ chainId }],
}: QueryFunctionArgs<typeof queryKey>) => {
  return fetchBlockNumber({ chainId })
}

export function useBlockNumber({
  cacheTime = 0,
  chainId: chainId_,
  enabled = true,
  staleTime,
  suspense,
  watch = false,
  onBlock,
  onError,
  onSettled,
  onSuccess,
}: UseBlockNumberArgs & UseBlockNumberConfig = {}) {
  const chainId = useChainId({ chainId: chainId_ })
  const provider = useProvider()
  const webSocketProvider = useWebSocketProvider()
  const queryClient = useQueryClient()

  React.useEffect(() => {
    if (!watch && !onBlock) return

    const listener = (blockNumber: number) => {
      // Just to be safe in case the provider implementation
      // calls the event callback after .off() has been called
      if (watch) queryClient.setQueryData(queryKey({ chainId }), blockNumber)
      if (onBlock) onBlock(blockNumber)
    }

    const provider_ = webSocketProvider ?? provider
    provider_.on('block', listener)

    return () => {
      provider_.off('block', listener)
    }
  }, [chainId, onBlock, provider, queryClient, watch, webSocketProvider])

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
