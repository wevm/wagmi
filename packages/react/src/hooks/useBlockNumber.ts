import { useQuery } from '@tanstack/react-query'
import {
  type GetBlockNumberQueryOptions,
  getBlockNumberQueryOptions,
  watchBlockNumber,
} from '@wagmi/core'
import * as React from 'react'

import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseBlockNumberParameters = GetBlockNumberQueryOptions & {
  watch?: boolean
}

export function useBlockNumber({
  chainId: chainId_,
  watch,
  ...rest
}: UseBlockNumberParameters = {}) {
  const config = useConfig()
  const defaultChainId = useChainId()
  const chainId = chainId_ ?? defaultChainId
  const queryOptions = getBlockNumberQueryOptions(config, { ...rest, chainId })

  React.useEffect(() => {
    if (!watch) return

    try {
      const unwatch = watchBlockNumber(config, {
        chainId,
        onBlockNumber: (blockNumber) =>
          config.queryClient.setQueryData(queryOptions.queryKey, blockNumber),
      })
      return unwatch
    } catch {}
  }, [chainId, watch])

  // TODO: `@tanstack/react-query` `exactOptionalPropertyTypes`
  // @ts-ignore
  return useQuery(queryOptions)
}
