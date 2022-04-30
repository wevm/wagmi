import * as React from 'react'
import {
  ReadContractArgs,
  ReadContractConfig,
  ReadContractResult,
  readContract,
  watchReadContract,
} from '@wagmi/core'
import { useQueryClient } from 'react-query'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { useBlockNumber } from '../network-status'
import { useChainId, useQuery } from '../utils'

type UseContractReadArgs = Partial<ReadContractConfig> & {
  /** If set to `true`, the cache will depend on the block number */
  cacheOnBlock?: boolean
  /** Subscribe to changes */
  watch?: boolean
}

export type UseContractReadConfig = QueryConfig<ReadContractResult, Error>

export const queryKey = ([
  contractConfig,
  functionName,
  { args, chainId, overrides },
  { blockNumber },
]: [
  ReadContractArgs,
  string,
  Partial<ReadContractConfig>,
  { blockNumber?: number },
]) =>
  [
    {
      entity: 'readContract',
      args,
      blockNumber,
      chainId,
      contractConfig,
      functionName,
      overrides,
    },
  ] as const

const queryFn = ({
  queryKey: [{ args, chainId, contractConfig, functionName, overrides }],
}: QueryFunctionArgs<typeof queryKey>) => {
  return readContract(contractConfig, functionName, {
    args,
    chainId,
    overrides,
  })
}

export function useContractRead(
  contractConfig: ReadContractArgs,
  functionName: string,
  {
    args,
    chainId: chainId_,
    overrides,
    cacheOnBlock = false,
    cacheTime,
    enabled: enabled_ = true,
    staleTime,
    suspense,
    watch,
    onError,
    onSettled,
    onSuccess,
  }: UseContractReadArgs & UseContractReadConfig = {},
) {
  const chainId = useChainId({ chainId: chainId_ })
  const { data: blockNumber } = useBlockNumber({
    enabled: watch || cacheOnBlock,
    watch,
  })

  const queryKey_ = React.useMemo(
    () =>
      queryKey([
        contractConfig,
        functionName,
        { args, chainId, overrides },
        { blockNumber: cacheOnBlock ? blockNumber : undefined },
      ]),
    [
      args,
      blockNumber,
      cacheOnBlock,
      chainId,
      contractConfig,
      functionName,
      overrides,
    ],
  )

  const enabled = React.useMemo(() => {
    let enabled = Boolean(enabled_ && contractConfig && functionName)
    if (cacheOnBlock) enabled = Boolean(enabled && blockNumber)
    return enabled
  }, [blockNumber, cacheOnBlock, contractConfig, enabled_, functionName])

  const client = useQueryClient()
  React.useEffect(() => {
    if (enabled) {
      const unwatch = watchReadContract(
        contractConfig,
        functionName,
        { args, chainId, overrides, listenToBlock: watch && !cacheOnBlock },
        (result) => client.setQueryData(queryKey_, result),
      )
      return unwatch
    }
  }, [
    args,
    cacheOnBlock,
    chainId,
    client,
    contractConfig,
    enabled,
    functionName,
    overrides,
    queryKey_,
    watch,
  ])

  return useQuery(queryKey_, queryFn, {
    cacheTime,
    enabled,
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess,
  })
}
