import {
  ReadContractConfig,
  ReadContractResult,
  deepEqual,
  minimizeContractInterface,
  parseContractResult,
  readContract,
} from '@wagmi/core'
import * as React from 'react'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { useBlockNumber } from '../network-status'
import { useChainId, useInvalidateOnBlock, useQuery } from '../utils'

type UseContractReadArgs = ReadContractConfig & {
  /** If set to `true`, the cache will depend on the block number */
  cacheOnBlock?: boolean
  /** Subscribe to changes */
  watch?: boolean
}

export type UseContractReadConfig = QueryConfig<ReadContractResult, Error>

export const queryKey = ([
  { addressOrName, args, chainId, contractInterface, functionName, overrides },
  { blockNumber },
]: [ReadContractConfig, { blockNumber?: number }]) =>
  [
    {
      entity: 'readContract',
      addressOrName,
      args,
      blockNumber,
      chainId,
      contractInterface: minimizeContractInterface({
        contractInterface,
        functionName,
      }),
      functionName,
      overrides,
    },
  ] as const

const queryFn = async ({
  queryKey: [
    {
      addressOrName,
      args,
      chainId,
      contractInterface,
      functionName,
      overrides,
    },
  ],
}: QueryFunctionArgs<typeof queryKey>) => {
  return (
    (await readContract({
      addressOrName,
      args,
      chainId,
      contractInterface,
      functionName,
      overrides,
    })) ?? null
  )
}

export function useContractRead({
  addressOrName,
  contractInterface,
  functionName,
  args,
  chainId: chainId_,
  overrides,
  cacheOnBlock = false,
  cacheTime,
  enabled: enabled_ = true,
  isDataEqual = deepEqual,
  select,
  staleTime,
  suspense,
  watch,
  onError,
  onSettled,
  onSuccess,
}: UseContractReadArgs & UseContractReadConfig) {
  const chainId = useChainId({ chainId: chainId_ })
  const { data: blockNumber } = useBlockNumber({
    enabled: watch || cacheOnBlock,
    watch,
  })

  const queryKey_ = React.useMemo(
    () =>
      queryKey([
        {
          addressOrName,
          args,
          chainId,
          contractInterface,
          functionName,
          overrides,
        },
        { blockNumber: cacheOnBlock ? blockNumber : undefined },
      ]),
    [
      addressOrName,
      args,
      blockNumber,
      cacheOnBlock,
      chainId,
      contractInterface,
      functionName,
      overrides,
    ],
  )

  const enabled = React.useMemo(() => {
    let enabled = Boolean(enabled_ && addressOrName && functionName)
    if (cacheOnBlock) enabled = Boolean(enabled && blockNumber)
    return enabled
  }, [addressOrName, blockNumber, cacheOnBlock, enabled_, functionName])

  useInvalidateOnBlock({ enabled: watch && !cacheOnBlock, queryKey: queryKey_ })

  return useQuery(queryKey_, queryFn, {
    cacheTime,
    enabled,
    isDataEqual,
    select: (data) => {
      const result = parseContractResult({
        contractInterface,
        data,
        functionName,
      })
      return select ? select(result) : result
    },
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess,
  })
}
