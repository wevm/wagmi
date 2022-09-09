import {
  ReadContractsConfig,
  ReadContractsResult,
  deepEqual,
  parseContractResult,
  readContracts,
} from '@wagmi/core'
import { ContractInterface } from 'ethers'
import * as React from 'react'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { useBlockNumber } from '../network-status'
import { useChainId, useInvalidateOnBlock, useQuery } from '../utils'

export type UseContractReadsConfig = QueryConfig<ReadContractsResult, Error> &
  ReadContractsConfig & {
    /** If set to `true`, the cache will depend on the block number */
    cacheOnBlock?: boolean
    /** Subscribe to changes */
    watch?: boolean
  }

export const queryKey = ([
  { allowFailure, contracts, overrides },
  { blockNumber, chainId },
]: [ReadContractsConfig, { blockNumber?: number; chainId?: number }]) =>
  [
    {
      entity: 'readContracts',
      allowFailure,
      blockNumber,
      chainId,
      contracts: contracts.map(
        ({ addressOrName, args, chainId, functionName }) => ({
          addressOrName,
          args,
          chainId,
          functionName,
        }),
      ),
      overrides,
    },
  ] as const

const queryFn =
  ({ contractInterfaces }: { contractInterfaces: ContractInterface[] }) =>
  ({
    queryKey: [{ allowFailure, contracts: contracts_, overrides }],
  }: QueryFunctionArgs<typeof queryKey>) => {
    const contracts = contracts_.map((contract, i) => ({
      ...contract,
      contractInterface: <ContractInterface>contractInterfaces[i],
    }))
    return readContracts({
      allowFailure,
      contracts,
      overrides,
    })
  }

export function useContractReads({
  allowFailure = true,
  cacheOnBlock = false,
  cacheTime,
  contracts,
  overrides,
  enabled: enabled_ = true,
  isDataEqual = deepEqual,
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
  const chainId = useChainId()

  const queryKey_ = React.useMemo(
    () =>
      queryKey([
        { allowFailure, contracts, overrides },
        { blockNumber: cacheOnBlock ? blockNumber : undefined, chainId },
      ]),
    [allowFailure, blockNumber, cacheOnBlock, chainId, contracts, overrides],
  )

  const contractInterfaces = contracts.map(
    ({ contractInterface }) => contractInterface,
  )

  const enabled = React.useMemo(() => {
    let enabled = Boolean(enabled_ && contracts.length > 0)
    if (cacheOnBlock) enabled = Boolean(enabled && blockNumber)
    return enabled
  }, [blockNumber, cacheOnBlock, contracts, enabled_])

  useInvalidateOnBlock({ enabled: watch && !cacheOnBlock, queryKey: queryKey_ })

  return useQuery(queryKey_, queryFn({ contractInterfaces }), {
    cacheTime,
    enabled,
    isDataEqual,
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
