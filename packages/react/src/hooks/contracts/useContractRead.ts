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
    watch,
    cacheTime,
    enabled: enabled_ = true,
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess,
  }: UseContractReadArgs & UseContractReadConfig = {},
) {
  const chainId = useChainId({ chainId: chainId_ })
  const { data: blockNumber } = useBlockNumber({ enabled: false, watch })

  const queryKey_ = React.useMemo(
    () =>
      queryKey([
        contractConfig,
        functionName,
        { args, chainId, overrides },
        { blockNumber: watch ? blockNumber : undefined },
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
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess,
  })
}
