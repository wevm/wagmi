import * as React from 'react'
import { QueryKey, useQueryClient } from 'react-query'

import { useBlockNumber } from '../network-status'

export function useInvalidateOnBlock({
  enabled,
  queryKey,
}: {
  enabled?: boolean
  queryKey: QueryKey
}) {
  const { data: blockNumber } = useBlockNumber({
    enabled,
    watch: enabled,
  })
  const queryClient = useQueryClient()

  const startBlock = React.useRef<number>()
  React.useEffect(() => {
    if (!enabled) return
    if (blockNumber === startBlock.current) return
    if (!startBlock.current) {
      startBlock.current = blockNumber
      return
    }

    queryClient.invalidateQueries(queryKey)
  }, [blockNumber, enabled, queryClient, queryKey])
}
