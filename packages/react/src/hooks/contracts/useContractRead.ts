import * as React from 'react'
import {
  ReadContractConfig,
  ReadContractResult,
  readContract,
  watchReadContract,
} from '@wagmi/core'
import { useQueryClient } from 'react-query'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { parseContractResult } from '../../utils'
import { useBlockNumber } from '../network-status'
import { useChainId, useQuery } from '../utils'

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
      contractInterface,
      functionName,
      overrides,
    },
  ] as const

const queryFn = ({
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
  return readContract({
    addressOrName,
    args,
    chainId,
    contractInterface,
    functionName,
    overrides,
  })
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

  const client = useQueryClient()
  React.useEffect(() => {
    if (enabled) {
      const unwatch = watchReadContract(
        {
          addressOrName,
          args,
          chainId,
          contractInterface,
          functionName,
          overrides,
          listenToBlock: watch && !cacheOnBlock,
        },
        (result) => client.setQueryData(queryKey_, result),
      )
      return unwatch
    }
  }, [
    addressOrName,
    args,
    cacheOnBlock,
    chainId,
    client,
    contractInterface,
    enabled,
    functionName,
    overrides,
    queryKey_,
    watch,
  ])

  return useQuery(queryKey_, queryFn, {
    cacheTime,
    enabled,
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
