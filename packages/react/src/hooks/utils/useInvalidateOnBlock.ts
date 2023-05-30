import type { QueryKey } from '@tanstack/react-query'
import * as React from 'react'

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

  const onBlock = React.useCallback(
    () => queryClient.invalidateQueries({ queryKey }, { cancelRefetch: false }),
    [queryClient, queryKey],
  )

  useBlockNumber({
    chainId,
    enabled,
    onBlock: enabled ? onBlock : undefined,
    scopeKey: enabled ? undefined : 'idle',
  })
}
