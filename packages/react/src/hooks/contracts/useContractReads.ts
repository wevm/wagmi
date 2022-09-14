import {
  ReadContractsConfig,
  ReadContractsResult,
  deepEqual,
  parseContractResult,
  readContracts,
} from '@wagmi/core'
import { Abi, Address } from 'abitype'
import * as React from 'react'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { useBlockNumber } from '../network-status'
import { useChainId, useInvalidateOnBlock, useQuery } from '../utils'

export type UseContractReadsConfig<TContracts extends unknown[]> = QueryConfig<
  ReadContractsResult<TContracts>,
  Error
> &
  ReadContractsConfig<TContracts> & {
    /** If set to `true`, the cache will depend on the block number */
    cacheOnBlock?: boolean
    /** Subscribe to changes */
    watch?: boolean
  }

function queryKey<TContracts extends unknown[]>(
  { allowFailure, contracts, overrides }: ReadContractsConfig<TContracts>,
  { blockNumber, chainId }: { blockNumber?: number; chainId?: number },
) {
  return [
    {
      entity: 'readContracts',
      allowFailure,
      blockNumber,
      chainId,
      contracts: (<ContractConfig[]>(<unknown>contracts)).map(
        ({ addressOrName, args, chainId, functionName }) => ({
          addressOrName,
          args,
          chainId,
          functionName,
        }),
      ) as unknown as ReadContractsConfig<TContracts>['contracts'],
      overrides,
    },
  ] as const
}

function queryFn<TContracts extends unknown[]>({
  contractInterfaces,
}: {
  contractInterfaces: (Abi | readonly unknown[])[]
}) {
  return ({
    queryKey: [{ allowFailure, contracts: contracts_, overrides }],
  }: QueryFunctionArgs<typeof queryKey<TContracts>>) => {
    const contracts = (<ContractConfig[]>(<unknown>contracts_)).map(
      (contract, i) => ({
        ...contract,
        contractInterface: <Abi | readonly unknown[]>contractInterfaces[i],
      }),
    ) as unknown as ReadContractsConfig<TContracts>['contracts']
    return readContracts({
      allowFailure,
      contracts,
      overrides,
    })
  }
}

type ContractConfig = {
  addressOrName: Address
  chainId?: number
  contractInterface: Abi
  functionName: string
  args: any[]
}

export function useContractReads<TContracts extends unknown[]>({
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
}: UseContractReadsConfig<TContracts>) {
  const { data: blockNumber } = useBlockNumber({
    enabled: watch || cacheOnBlock,
    watch,
  })
  const chainId = useChainId()

  const queryKey_ = React.useMemo(
    () =>
      queryKey(
        { allowFailure, contracts, overrides },
        { blockNumber: cacheOnBlock ? blockNumber : undefined, chainId },
      ),
    [allowFailure, blockNumber, cacheOnBlock, chainId, contracts, overrides],
  )

  const contractInterfaces: (Abi | readonly unknown[])[] = (<ContractConfig[]>(
    (<unknown>contracts)
  )).map(({ contractInterface }) => contractInterface)

  const enabled = React.useMemo(() => {
    let enabled = Boolean(enabled_ && contracts.length > 0)
    if (cacheOnBlock) enabled = Boolean(enabled && blockNumber)
    return enabled
  }, [blockNumber, cacheOnBlock, contracts, enabled_])

  useInvalidateOnBlock({ enabled: watch && !cacheOnBlock, queryKey: queryKey_ })

  return useQuery(queryKey_, queryFn<TContracts>({ contractInterfaces }), {
    cacheTime,
    enabled,
    isDataEqual,
    keepPreviousData,
    staleTime,
    select(data) {
      const result = data.map((data, i) =>
        contracts[i]
          ? parseContractResult({
              contractInterface: (<ContractConfig>contracts[i])
                ?.contractInterface,
              functionName: (<ContractConfig>contracts[i])?.functionName,
              data,
            })
          : data,
      ) as ReadContractsResult<TContracts>
      return select ? select(result) : result
    },
    suspense,
    onError,
    onSettled,
    onSuccess,
  })
}
