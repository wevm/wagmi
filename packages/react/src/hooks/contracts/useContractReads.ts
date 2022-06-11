import * as React from 'react'
import {
  ReadContractsConfig,
  ReadContractsResult,
  readContracts,
  watchReadContracts,
} from '@wagmi/core'
import { useQueryClient } from 'react-query'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { useBlockNumber } from '../network-status'
import { useQuery } from '../utils'
import { parseContractResult } from '../../utils'

export type UseContractReadsConfig = QueryConfig<ReadContractsResult, Error> &
  ReadContractsConfig & {
    /** If set to `true`, the cache will depend on the block number */
    cacheOnBlock?: boolean
    /** Subscribe to changes */
    watch?: boolean
  }

export const queryKey = ([{ contracts, overrides }, { blockNumber }]: [
  ReadContractsConfig,
  { blockNumber?: number },
]) =>
  [
    {
      entity: 'readContracts',
      contracts,
      blockNumber,
      overrides,
    },
  ] as const

const queryFn = ({
  queryKey: [{ contracts, overrides }],
}: QueryFunctionArgs<typeof queryKey>) => {
  return readContracts({
    contracts,
    overrides,
  })
}

export function useContractReads({
  cacheOnBlock = false,
  cacheTime,
  contracts,
  overrides,
  enabled: enabled_ = true,
  keepPreviousData,
  onError,
  onSettled,
  onSuccess,
  select,
  staleTime,
  suspense,
  watch,
}: UseContractReadsConfig) {
  const { data: blockNumber } = useBlockNumber({
    enabled: watch || cacheOnBlock,
    watch,
  })

  const queryKey_ = React.useMemo(
    () => queryKey([{ contracts, overrides }, { blockNumber }]),
    [blockNumber, contracts, overrides],
  )

  const enabled = React.useMemo(() => {
    let enabled = Boolean(enabled_ && contracts.length > 0)
    if (cacheOnBlock) enabled = Boolean(enabled && blockNumber)
    return enabled
  }, [blockNumber, cacheOnBlock, contracts, enabled_])

  const client = useQueryClient()
  React.useEffect(() => {
    if (enabled) {
      const unwatch = watchReadContracts(
        {
          contracts,
          overrides,
          listenToBlock: watch && !cacheOnBlock,
        },
        (result) => client.setQueryData(queryKey_, result),
      )
      return unwatch
    }
  }, [cacheOnBlock, client, contracts, enabled, overrides, queryKey_, watch])

  return useQuery(queryKey_, queryFn, {
    cacheTime,
    enabled,
    keepPreviousData,
    staleTime,
    select: (data) => {
      const result = data.map((data, i) =>
        contracts[i]
          ? parseContractResult({
              contractInterface: (<typeof contracts[number]>contracts[i])
                ?.contractInterface,
              functionName: (<typeof contracts[number]>contracts[i])
                ?.functionName,
              data,
            })
          : data,
      )
      return select ? select(result) : result
    },
    suspense,
    onError,
    onSettled,
    onSuccess,
  })
}
