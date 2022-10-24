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
import {
  UseQueryResult,
  useChainId,
  useInvalidateOnBlock,
  useQuery,
} from '../utils'

export type UseContractReadsConfig<TContracts extends unknown[]> =
  ReadContractsConfig<
    TContracts,
    {
      isAbiOptional: true
      isAddressOptional: true
      isArgsOptional: true
      isContractsOptional: true
      isFunctionNameOptional: true
    }
  > &
    QueryConfig<ReadContractsResult<TContracts>, Error> & {
      /** If set to `true`, the cache will depend on the block number */
      cacheOnBlock?: boolean
      /** Subscribe to changes */
      watch?: boolean
    }

function queryKey<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
  TContracts extends {
    abi: TAbi
    functionName: TFunctionName
  }[],
>(
  {
    allowFailure,
    contracts,
    overrides,
  }: ReadContractsConfig<
    TContracts,
    {
      isAbiOptional: true
      isAddressOptional: true
      isArgsOptional: true
      isContractsOptional: true
      isFunctionNameOptional: true
    }
  >,
  { blockNumber, chainId }: { blockNumber?: number; chainId?: number },
) {
  return [
    {
      entity: 'readContracts',
      allowFailure,
      blockNumber,
      chainId,
      contracts: ((contracts ?? []) as unknown as ContractConfig[]).map(
        ({ address, args, chainId, functionName }) => ({
          address,
          args,
          chainId,
          functionName,
        }),
      ),
      overrides,
    },
  ] as const
}

function queryFn<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
  TContracts extends {
    abi: TAbi
    functionName: TFunctionName
  }[],
>({ abis }: { abis: (Abi | readonly unknown[])[] }) {
  return ({
    queryKey: [{ allowFailure, contracts: contracts_, overrides }],
  }: QueryFunctionArgs<typeof queryKey<TAbi, TFunctionName, TContracts>>) => {
    const contracts = (contracts_ as unknown as ContractConfig[]).map(
      (contract, i) => ({
        ...contract,
        abi: abis[i] as Abi,
      }),
    )
    return readContracts({
      allowFailure,
      contracts,
      overrides,
    }) as Promise<ReadContractsResult<TContracts>>
  }
}

type ContractConfig = {
  address: Address
  chainId?: number
  abi: Abi | readonly unknown[]
  functionName: string
  args: any[]
}

export function useContractReads<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
  TContracts extends {
    abi: TAbi
    functionName: TFunctionName
  }[],
>(
  {
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
  }: UseContractReadsConfig<TContracts> = {} as any,
  // Need explicit type annotation so TypeScript doesn't expand return type into recursive conditional
): UseQueryResult<ReadContractsResult<TContracts>, Error> {
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

  const enabled = React.useMemo(() => {
    let enabled = Boolean(
      enabled_ && contracts?.every((x) => x.abi && x.address && x.functionName),
    )
    if (cacheOnBlock) enabled = Boolean(enabled && blockNumber)
    return enabled
  }, [blockNumber, cacheOnBlock, contracts, enabled_])

  useInvalidateOnBlock({ enabled: watch && !cacheOnBlock, queryKey: queryKey_ })

  const abis = ((contracts ?? []) as unknown as ContractConfig[]).map(
    ({ abi }) => abi,
  )

  return useQuery(queryKey_, queryFn({ abis }), {
    cacheTime,
    enabled,
    isDataEqual,
    keepPreviousData,
    staleTime,
    select(data) {
      const result = data.map((data, i) => {
        const { abi, functionName } = (contracts?.[i] ?? {}) as ContractConfig
        return abi && functionName
          ? parseContractResult({ abi, functionName, data })
          : data
      }) as ReadContractsResult<TContracts>
      return select ? select(result) : result
    },
    suspense,
    onError,
    onSettled,
    onSuccess,
  })
}
