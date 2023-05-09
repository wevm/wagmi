import { replaceEqualDeep } from '@tanstack/react-query'
import type { ReadContractsConfig, ReadContractsResult } from '@wagmi/core'
import { deepEqual, readContracts } from '@wagmi/core'
import type { Abi } from 'abitype'
import * as React from 'react'
import type { ContractFunctionConfig } from 'viem'

import type {
  DeepPartial,
  QueryConfigWithSelect,
  QueryFunctionArgs,
} from '../../types'
import { useBlockNumber } from '../network-status'
import type { UseQueryResult } from '../utils'
import { useChainId, useInvalidateOnBlock, useQuery } from '../utils'

export type UseContractReadsConfig<
  TContracts extends ContractFunctionConfig[],
  TAllowFailure extends boolean = true,
  TSelectData = ReadContractsResult<TContracts, TAllowFailure>,
  Config = ReadContractsConfig<TContracts, TAllowFailure>,
> = {
  [K in keyof Config]?: K extends 'contracts'
    ? DeepPartial<Config[K], 2>
    : Config[K]
} & QueryConfigWithSelect<
  ReadContractsResult<TContracts, TAllowFailure>,
  Error,
  TSelectData
> & {
    /** If set to `true`, the cache will depend on the block number */
    cacheOnBlock?: boolean
    /** Set this to `true` to keep the previous data when fetching based on a new query key. Defaults to `false`. */
    keepPreviousData?: boolean
  } & (
    | {
        /** Block number to read against. */
        blockNumber?: ReadContractsConfig<TContracts>['blockNumber']
        blockTag?: never
        watch?: never
      }
    | {
        blockNumber?: never
        /** Block tag to read against. */
        blockTag?: ReadContractsConfig<TContracts>['blockTag']
        watch?: never
      }
    | {
        blockNumber?: never
        blockTag?: never
        /** Refresh on incoming blocks. */
        watch?: boolean
      }
  )

type QueryKeyArgs<
  TContracts extends ContractFunctionConfig[],
  TAllowFailure extends boolean = true,
> = Omit<
  ReadContractsConfig<TContracts, TAllowFailure>,
  'blockNumber' | 'blockTag'
> & {
  blockNumber?: bigint
  blockTag?: string
}
type QueryKeyConfig<TContracts extends ContractFunctionConfig[]> = Pick<
  UseContractReadsConfig<TContracts>,
  'scopeKey'
> & {
  chainId?: number
}

function queryKey<
  TContracts extends ContractFunctionConfig[],
  TAllowFailure extends boolean = true,
>({
  allowFailure,
  blockNumber,
  blockTag,
  chainId,
  contracts,
  scopeKey,
}: QueryKeyArgs<TContracts, TAllowFailure> & QueryKeyConfig<TContracts>) {
  return [
    {
      entity: 'readContracts',
      allowFailure,
      blockNumber,
      blockTag,
      chainId,
      scopeKey,
      contracts: (
        (contracts ?? []) as unknown as (ContractFunctionConfig & {
          chainId?: number
        })[]
      ).map(({ address, args, chainId, functionName }) => ({
        address,
        args,
        chainId,
        functionName,
      })),
    },
  ] as const
}

function queryFn<
  TContracts extends ContractFunctionConfig[],
  TAllowFailure extends boolean = true,
>({ abis }: { abis: (Abi | readonly unknown[])[] }) {
  return ({
    queryKey: [{ allowFailure, blockNumber, blockTag, contracts: contracts_ }],
  }: QueryFunctionArgs<typeof queryKey<TContracts>>) => {
    const contracts = contracts_.map((contract, i) => ({
      ...contract,
      abi: abis[i] as Abi,
    }))
    return readContracts({
      allowFailure,
      contracts,
      blockNumber,
      blockTag,
    } as ReadContractsConfig<TContracts, TAllowFailure>) as Promise<
      ReadContractsResult<TContracts, TAllowFailure>
    >
  }
}

export function useContractReads<
  TContracts extends ContractFunctionConfig[],
  TAllowFailure extends boolean = true,
  TSelectData = ReadContractsResult<TContracts, TAllowFailure>,
>(
  {
    allowFailure: allowFailure_,
    blockNumber: blockNumberOverride,
    blockTag,
    cacheOnBlock = false,
    cacheTime,
    contracts,
    enabled: enabled_ = true,
    isDataEqual,
    keepPreviousData,
    onError,
    onSettled,
    onSuccess,
    scopeKey,
    select,
    staleTime,
    structuralSharing = (oldData, newData) =>
      deepEqual(oldData, newData)
        ? oldData
        : (replaceEqualDeep(oldData, newData) as any),
    suspense,
    watch,
  }: UseContractReadsConfig<TContracts, TAllowFailure, TSelectData> = {} as any,
  // Need explicit type annotation so TypeScript doesn't expand return type into recursive conditional
): UseQueryResult<TSelectData, Error> {
  const allowFailure = allowFailure_ ?? true

  const { data: blockNumber_ } = useBlockNumber({
    enabled: watch || cacheOnBlock,
    watch,
  })
  const chainId = useChainId()

  const blockNumber = blockNumberOverride ?? blockNumber_

  const queryKey_ = React.useMemo(
    () =>
      queryKey({
        allowFailure,
        blockNumber: cacheOnBlock ? blockNumber : undefined,
        blockTag,
        chainId,
        contracts,
        scopeKey,
      } as QueryKeyArgs<TContracts> & QueryKeyConfig<TContracts>),
    [
      allowFailure,
      blockNumber,
      blockTag,
      cacheOnBlock,
      chainId,
      scopeKey,
      contracts,
    ],
  )

  const enabled = React.useMemo(() => {
    let enabled = Boolean(
      enabled_ &&
        (contracts as unknown as ContractFunctionConfig[])?.every(
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

  const abis = ((contracts ?? []) as unknown as ContractFunctionConfig[]).map(
    ({ abi }) => abi,
  )

  return useQuery(queryKey_, queryFn({ abis }), {
    cacheTime,
    enabled,
    isDataEqual,
    keepPreviousData,
    staleTime,
    select,
    structuralSharing,
    suspense,
    onError,
    onSettled,
    onSuccess,
  })
}
