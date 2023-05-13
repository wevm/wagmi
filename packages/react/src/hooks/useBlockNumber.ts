import { useQuery } from '@tanstack/react-query'
import {
  type GetBlockNumberQueryOptions,
  getBlockNumberQueryOptions,
  watchBlockNumber,
} from '@wagmi/core'
import * as React from 'react'

import { useConfig } from '../context.js'

export type UseBlockNumberParameters = GetBlockNumberQueryOptions & {
  watch?: boolean
}

export function useBlockNumber({
  chainId: chainId_,
  watch,
  ...rest
}: UseBlockNumberParameters = {}) {
  const config = useConfig()
  const chainId = chainId_ ?? config.chains[0]?.id
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
  }, [])

  // TODO: `@tanstack/react-query` `exactOptionalPropertyTypes`
  // @ts-ignore
  return useQuery(queryOptions)
}
