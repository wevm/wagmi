import * as React from 'react'
import {
  ReadContractArgs,
  ReadContractConfig,
  ReadContractResult,
  readContract,
  watchReadContract,
} from '@wagmi/core'
import { useQuery, useQueryClient } from 'react-query'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { useBlockNumber } from '../network-status'
import { useChainId } from '../utils'

type UseContractReadArgs = Partial<ReadContractConfig> & {
  /** Subscribe to changes */
  watch?: boolean
}

export type UseContractReadConfig = QueryConfig<ReadContractResult, Error>

export const queryKey = ([
  contractConfig,
  functionName,
  { args, overrides },
  { blockNumber, chainId },
]: [
  ReadContractArgs,
  string,
  Partial<ReadContractConfig>,
  { blockNumber?: number; chainId?: number },
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
  queryKey: [{ args, contractConfig, functionName, overrides }],
}: QueryFunctionArgs<typeof queryKey>) => {
  return readContract(contractConfig, functionName, { args, overrides })
}

export function useContractRead(
  contractConfig: ReadContractArgs,
  functionName: string,
  {
    args,
    overrides,
    watch,
    cacheTime,
    enabled: enabled_ = true,
    keepPreviousData,
    select,
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess,
  }: UseContractReadArgs & UseContractReadConfig = {},
) {
  const chainId = useChainId()
  const { data: blockNumber } = useBlockNumber({ enabled: false, watch })

  const queryKey_ = React.useMemo(
    () =>
      queryKey([
        contractConfig,
        functionName,
        { args, overrides },
        {
          chainId,
          blockNumber: watch ? blockNumber : undefined,
        },
      ]),
    [
      args,
      blockNumber,
      chainId,
      contractConfig,
      functionName,
      overrides,
      watch,
    ],
  )

  const enabled = React.useMemo(() => {
    let enabled = Boolean(enabled_ && contractConfig && functionName)
    if (watch) {
      enabled = Boolean(enabled && blockNumber)
    }
    return enabled
  }, [blockNumber, contractConfig, enabled_, functionName, watch])

  const client = useQueryClient()
  React.useEffect(() => {
    enabled &&
      watchReadContract(
        contractConfig,
        functionName,
        { args, overrides, listenToBlock: false },
        (result) => client.setQueryData(queryKey_, result),
      )
  }, [
    args,
    client,
    contractConfig,
    enabled,
    functionName,
    overrides,
    queryKey_,
  ])

  return useQuery(queryKey_, queryFn, {
    cacheTime,
    enabled,
    keepPreviousData,
    select,
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess,
  })
}
