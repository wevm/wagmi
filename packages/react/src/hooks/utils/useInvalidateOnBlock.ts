import { QueryKey, useQueryClient } from '@tanstack/react-query'

import { useBlockNumber } from '../network-status'

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
    onBlock: enabled
      ? () => queryClient.invalidateQueries(queryKey)
      : undefined,
  })
}
