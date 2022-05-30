import React from 'react'
import {
  ReadContractResult,
  ReadContractsConfig,
  readContracts,
  watchReadContracts,
} from '@wagmi/core'
import { useQueryClient } from 'react-query'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { useBlockNumber } from '../network-status'
import { useChainId, useQuery } from '../utils'

export type UseContractReadsConfig = QueryConfig<ReadContractResult, Error> &
  ReadContractsConfig & {
    /** If set to `true`, the cache will depend on the block number */
    cacheOnBlock?: boolean
    /** Subscribe to changes */
    watch?: boolean
  }

export const queryKey = ([{ chainId, contracts, overrides }, { blockNumber }]: [
  ReadContractsConfig,
  { blockNumber?: number },
]) =>
  [
    {
      entity: 'readContracts',
      contracts,
      blockNumber,
      chainId,
      overrides,
    },
  ] as const

const queryFn = ({
  queryKey: [{ contracts, chainId, overrides }],
}: QueryFunctionArgs<typeof queryKey>) => {
  return readContracts({
    chainId,
    contracts,
    overrides,
  })
}

export function useContractReads({
  cacheOnBlock = false,
  cacheTime,
  contracts,
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
}: UseContractReadsConfig) {
  const chainId = useChainId({ chainId: chainId_ })
  const { data: blockNumber } = useBlockNumber({
    enabled: watch || cacheOnBlock,
    watch,
  })

  const queryKey_ = React.useMemo(
    () => queryKey([{ chainId, contracts, overrides }, { blockNumber }]),
    [],
  )

  const enabled = React.useMemo(() => {
    let enabled = Boolean(enabled_ && contracts.length > 0)
    if (cacheOnBlock) enabled = Boolean(enabled && blockNumber)
    return enabled
  }, [blockNumber, cacheOnBlock, enabled_])

  const client = useQueryClient()
  React.useEffect(() => {
    if (enabled) {
      const unwatch = watchReadContracts(
        {
          chainId,
          contracts,
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
