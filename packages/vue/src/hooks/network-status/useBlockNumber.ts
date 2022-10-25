import { useQuery, useQueryClient } from '@tanstack/vue-query'
import {
  FetchBlockNumberArgs,
  FetchBlockNumberResult,
  fetchBlockNumber,
} from '@wagmi/core'
import { debounce } from '@wagmi/core/internal'
import { computed, unref, watchEffect } from 'vue-demi'

import { MaybeRef, QueryConfig, QueryFunctionArgs } from '../../types'
import { useProvider, useWebSocketProvider } from '../providers'
import { useChainId } from '../utils'

type UseBlockNumberArgs = Partial<{
  [Property in keyof FetchBlockNumberArgs]: MaybeRef<
    FetchBlockNumberArgs[Property]
  >
}> & {
  /** Function fires when a new block is created */
  onBlock?: MaybeRef<(blockNumber: number) => void>
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
  const chainId = computed(() => {
    return useChainId({ chainId: unref(chainId_) })
  })
  const provider = computed(() => {
    return useProvider({ chainId: unref(chainId_) }).value
  })
  const webSocketProvider = computed(() => {
    return useWebSocketProvider({ chainId: unref(chainId_) }).value
  })
  const queryClient = useQueryClient()
  const computedQueryKey = computed(() => {
    return queryKey({ chainId: unref(chainId) })
  })

  let unsubscribe: () => void | undefined
  watchEffect(() => {
    const plainOnBlock = unref(onBlock)
    if (!watch && !plainOnBlock) return
    unsubscribe && unsubscribe()

    // We need to debounce the listener as we want to opt-out
    // of the behavior where ethers emits a "block" event for
    // every block that was missed in between the `pollingInterval`.
    // We are setting a wait time of 1 as emitting an event in
    // ethers takes ~0.1ms.
    const listener = debounce((blockNumber: number) => {
      // Just to be safe in case the provider implementation
      // calls the event callback after .off() has been called
      if (watch)
        queryClient.setQueryData(
          queryKey({ chainId: unref(chainId) }),
          blockNumber,
        )
      plainOnBlock && plainOnBlock(blockNumber)
    }, 1)

    const provider_ = webSocketProvider.value ?? provider.value
    provider_.on('block', listener)

    unsubscribe = () => {
      provider_.off('block', listener)
    }
  })

  return useQuery(computedQueryKey.value, queryFn, {
    cacheTime,
    enabled,
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess,
  })
}
