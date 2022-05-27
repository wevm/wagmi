import React from 'react'
import {
  ReadContractResult,
  ReadContractsArgs,
  ReadContractsConfig,
  readContracts,
  watchReadContracts,
} from '@wagmi/core'
import { useQueryClient } from 'react-query'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { useBlockNumber } from '../network-status'
import { useChainId, useQuery } from '../utils'

export type UseContractReadsArgs = ReadContractsArgs
export type UseContractReadsConfig = QueryConfig<ReadContractResult, Error> &
  ReadContractsConfig & {
    /** If set to `true`, the cache will depend on the block number */
    cacheOnBlock?: boolean
    /** Subscribe to changes */
    watch?: boolean
  }

export const queryKey = ([
  readContractsArgs,
  { chainId, overrides },
  { blockNumber },
]: [ReadContractsArgs, ReadContractsConfig, { blockNumber?: number }]) =>
  [
    {
      entity: 'readContracts',
      readContractsArgs,
      blockNumber,
      chainId,
      overrides,
    },
  ] as const

const queryFn = ({
  queryKey: [{ readContractsArgs, chainId, overrides }],
}: QueryFunctionArgs<typeof queryKey>) => {
  return readContracts(readContractsArgs, {
    chainId,
    overrides,
  })
}

export function useContractReads(
  readContractsArgs: UseContractReadsArgs,
  {
    cacheOnBlock = false,
    cacheTime,
    chainId: chainId_,
    enabled: enabled_ = true,
    keepPreviousData,
    onError,
    onSettled,
    onSuccess,
    overrides,
    staleTime,
    suspense,
    watch,
  }: UseContractReadsConfig = {},
) {
  const chainId = useChainId({ chainId: chainId_ })
  const { data: blockNumber } = useBlockNumber({
    enabled: watch || cacheOnBlock,
    watch,
  })

  const queryKey_ = React.useMemo(
    () =>
      queryKey([readContractsArgs, { chainId, overrides }, { blockNumber }]),
    [],
  )

  const enabled = React.useMemo(() => {
    let enabled = Boolean(enabled_ && readContractsArgs.length > 0)
    if (cacheOnBlock) enabled = Boolean(enabled && blockNumber)
    return enabled
  }, [blockNumber, cacheOnBlock, enabled_])

  const client = useQueryClient()
  React.useEffect(() => {
    if (enabled) {
      const unwatch = watchReadContracts(
        readContractsArgs,
        {
          chainId,
          overrides,
          listenToBlock: watch && !cacheOnBlock,
        },
        (result) => client.setQueryData(queryKey_, result),
      )
      return unwatch
    }
  }, [cacheOnBlock, chainId, client, enabled, overrides, queryKey_, watch])

  return useQuery(queryKey_, queryFn, {
    cacheTime,
    enabled,
    keepPreviousData,
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess,
  })
}
