import { replaceEqualDeep } from '@tanstack/react-query'
import type { ReadContractsConfig, ReadContractsResult } from '@wagmi/core'
import { deepEqual, parseContractResult, readContracts } from '@wagmi/core'
import type { Contract } from '@wagmi/core/internal'
import type { Abi, Address } from 'abitype'
import * as React from 'react'

import type { DeepPartial, QueryConfig, QueryFunctionArgs } from '../../types'
import { useBlockNumber } from '../network-status'
import type { UseQueryResult } from '../utils'
import { useChainId, useInvalidateOnBlock, useQuery } from '../utils'

export type UseContractReadsConfig<
  TContracts extends Contract[],
  TSelectData = ReadContractsResult<TContracts>,
  Config = ReadContractsConfig<TContracts>,
> = {
  [K in keyof Config]?: K extends 'contracts'
    ? DeepPartial<Config[K], 2>
    : Config[K]
} & QueryConfig<ReadContractsResult<TContracts>, Error, TSelectData> & {
    /** If set to `true`, the cache will depend on the block number */
    cacheOnBlock?: boolean
    /** Subscribe to changes */
    watch?: boolean
  }

type QueryKeyArgs<TContracts extends Contract[]> =
  ReadContractsConfig<TContracts>
type QueryKeyConfig<TContracts extends Contract[]> = Pick<
  UseContractReadsConfig<TContracts>,
  'scopeKey'
> & {
  blockNumber?: number
  chainId?: number
}

function queryKey<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
  TContracts extends {
    abi: TAbi
    functionName: TFunctionName
  }[],
>({
  allowFailure,
  blockNumber,
  chainId,
  contracts,
  overrides,
  scopeKey,
}: QueryKeyArgs<TContracts> & QueryKeyConfig<TContracts>) {
  return [
    {
      entity: 'readContracts',
      allowFailure,
      blockNumber,
      chainId,
      scopeKey,
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
  abi: Abi
  address: Address
  args: unknown[]
  chainId?: number
  functionName: string
}

export function useContractReads<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
  TContracts extends {
    abi: TAbi
    functionName: TFunctionName
  }[],
  TSelectData = ReadContractsResult<TContracts>,
>(
  {
    allowFailure = true,
    cacheOnBlock = false,
    cacheTime,
    contracts,
    enabled: enabled_ = true,
    isDataEqual,
    keepPreviousData,
    onError,
    onSettled,
    onSuccess,
    overrides,
    scopeKey,
    select,
    staleTime,
    structuralSharing = (oldData, newData) =>
      deepEqual(oldData, newData)
        ? oldData
        : (replaceEqualDeep(oldData, newData) as any),
    suspense,
    watch,
  }: UseContractReadsConfig<TContracts, TSelectData> = {} as any,
  // Need explicit type annotation so TypeScript doesn't expand return type into recursive conditional
): UseQueryResult<TSelectData, Error> {
  const { data: blockNumber } = useBlockNumber({
    enabled: watch || cacheOnBlock,
    watch,
  })
  const chainId = useChainId()

  const queryKey_ = React.useMemo(
    () =>
      queryKey({
        allowFailure,
        blockNumber: cacheOnBlock ? blockNumber : undefined,
        chainId,
        contracts: contracts as unknown as ContractConfig[],
        overrides,
        scopeKey,
      }),
    [
      allowFailure,
      blockNumber,
      cacheOnBlock,
      chainId,
      scopeKey,
      contracts,
      overrides,
    ],
  )

  const enabled = React.useMemo(() => {
    let enabled = Boolean(
      enabled_ &&
        (contracts as unknown as ContractConfig[])?.every(
          (x) => x.abi && x.address && x.functionName,
        ),
    )
    if (cacheOnBlock) enabled = Boolean(enabled && blockNumber)
    return enabled
  }, [blockNumber, cacheOnBlock, contracts, enabled_])

  useInvalidateOnBlock({
    enabled: Boolean(enabled && watch && !cacheOnBlock),
    queryKey: queryKey_,
  })

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
      return (select ? select(result) : result) as TSelectData
    },
    structuralSharing,
    suspense,
    onError,
    onSettled,
    onSuccess,
  })
}
