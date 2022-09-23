import {
  FetchBlockNumberArgs,
  FetchBlockNumberResult,
  fetchBlockNumber,
} from '@wagmi/core'
import { debounce } from '@wagmi/core/internal'
import * as React from 'react'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { useProvider, useWebSocketProvider } from '../providers'
import { useChainId, useQuery, useQueryClient } from '../utils'

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
  const provider = useProvider({ chainId })
  const webSocketProvider = useWebSocketProvider({ chainId })
  const queryClient = useQueryClient()

  React.useEffect(() => {
    if (!watch && !onBlock) return

    // We need to debounce the listener as we want to opt-out
    // of the behavior where ethers emits a "block" event for
    // every block that was missed in between the `pollingInterval`.
    // We are setting a wait time of 1 as emitting an event in
    // ethers takes ~0.1ms.
    const listener = debounce((blockNumber: number) => {
      // Just to be safe in case the provider implementation
      // calls the event callback after .off() has been called
      if (watch) queryClient.setQueryData(queryKey({ chainId }), blockNumber)
      if (onBlock) onBlock(blockNumber)
    }, 1)

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
