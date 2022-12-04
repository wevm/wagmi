import type { QueryKey } from '@tanstack/react-query'

import { useBlockNumber } from '../network-status'
import { useQueryClient } from './query'

export function useInvalidateOnBlock({
  chainId,
  enabled,
  queryKey,
}: {
  chainId?: number
  enabled?: boolean
  queryKey: QueryKey
}) {
  const queryClient = useQueryClient()
  useBlockNumber({
    chainId,
    enabled,
    onBlock: enabled
      ? () => queryClient.invalidateQueries(queryKey)
      : undefined,
    scopeKey: enabled ? undefined : 'idle',
  })
}
