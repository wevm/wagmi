// TODO(jxom): write tests for this

import {
  ReadContractArgs,
  ReadContractConfig,
  ReadContractResult,
  readContract,
  watchReadContract,
} from '@wagmi/core'
import { useEffect, useMemo } from 'react'
import { useQuery, useQueryClient } from 'react-query'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { useBlockNumber } from '../network-status'
import { useChainId, useGetterWithConfig } from '../utils'

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
      entity: 'balance',
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

export const useContractRead = (
  contractConfig: ReadContractArgs,
  functionName: string,
  {
    args: args_,
    overrides: overrides_,
    watch,
    cacheTime,
    enabled: enabled_ = true,
    staleTime,
    onError,
    onSettled,
    onSuccess,
  }: UseContractReadArgs & UseContractReadConfig = {},
) => {
  const chainId = useChainId()
  const { data: blockNumber } = useBlockNumber({ enabled: false, watch })

  const {
    config: { args, overrides },
    forceEnabled,
    getter,
  } = useGetterWithConfig<ReadContractConfig>({
    args: args_,
    overrides: overrides_,
  })

  const queryKey_ = useMemo(
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

  const enabled = useMemo(() => {
    let enabled = Boolean(enabled_ && contractConfig && functionName)
    if (watch) {
      enabled = Boolean(enabled && blockNumber)
    }
    return enabled
  }, [blockNumber, contractConfig, enabled_, functionName, watch])

  const client = useQueryClient()
  useEffect(() => {
    ;(forceEnabled || enabled) &&
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
    forceEnabled,
    functionName,
    overrides,
    queryKey_,
  ])

  const contractReadQuery = useQuery(queryKey_, queryFn, {
    cacheTime,
    enabled: forceEnabled || enabled,
    staleTime,
    onError,
    onSettled,
    onSuccess,
  })

  return {
    ...contractReadQuery,
    read: getter(contractReadQuery.refetch),
  }
}
