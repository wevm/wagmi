import type { FetchBlockNumberArgs, FetchBlockNumberResult } from '@wagmi/core'
import { fetchBlockNumber } from '@wagmi/core'
import * as React from 'react'

import type { QueryConfig, QueryFunctionArgs } from '../../types'
import { useChainId, useQuery, useQueryClient } from '../utils'
import { usePublicClient, useWebSocketPublicClient } from '../viem'

export type UseBlockNumberArgs = Partial<FetchBlockNumberArgs> & {
  /** Function fires when a new block is created */
  onBlock?: (blockNumber: bigint) => void
  /** Subscribe to changes */
  watch?: boolean
}
export type UseBlockNumberConfig = QueryConfig<FetchBlockNumberResult, Error>

type QueryKeyArgs = Partial<FetchBlockNumberArgs>
type QueryKeyConfig = Pick<UseBlockNumberConfig, 'scopeKey'>

function queryKey({ chainId, scopeKey }: QueryKeyArgs & QueryKeyConfig) {
  return [{ entity: 'blockNumber', chainId, scopeKey }] as const
}

function queryFn({
  queryKey: [{ chainId }],
}: QueryFunctionArgs<typeof queryKey>) {
  return fetchBlockNumber({ chainId })
}

export function useBlockNumber({
  cacheTime = 0,
  chainId: chainId_,
  enabled = true,
  scopeKey,
  staleTime,
  suspense,
  watch = false,
  onBlock,
  onError,
  onSettled,
  onSuccess,
}: UseBlockNumberArgs & UseBlockNumberConfig = {}) {
  const chainId = useChainId({ chainId: chainId_ })
  const publicClient = usePublicClient({ chainId })
  const webSocketPublicClient = useWebSocketPublicClient({ chainId })
  const queryClient = useQueryClient()

  React.useEffect(() => {
    if (!enabled) return
    if (!watch && !onBlock) return

    const publicClient_ = webSocketPublicClient ?? publicClient
    const unwatch = publicClient_.watchBlockNumber({
      onBlockNumber: (blockNumber) => {
        if (watch)
          queryClient.setQueryData(queryKey({ chainId, scopeKey }), blockNumber)
        if (onBlock) onBlock(blockNumber)
      },
      emitOnBegin: true,
    })
    return unwatch
  }, [
    chainId,
    scopeKey,
    onBlock,
    publicClient,
    queryClient,
    watch,
    webSocketPublicClient,
    enabled,
  ])

  return useQuery(queryKey({ scopeKey, chainId }), queryFn, {
    cacheTime,
    enabled,
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess,
  })
}
