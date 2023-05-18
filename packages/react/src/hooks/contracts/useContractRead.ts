import { replaceEqualDeep } from '@tanstack/react-query'
import type { ReadContractConfig, ReadContractResult } from '@wagmi/core'
import { deepEqual, readContract } from '@wagmi/core'
import type { Abi } from 'abitype'
import * as React from 'react'

import type {
  PartialBy,
  QueryConfigWithSelect,
  QueryFunctionArgs,
} from '../../types'
import { useBlockNumber } from '../network-status'
import { useChainId, useInvalidateOnBlock, useQuery } from '../utils'

export type UseContractReadConfig<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
  TSelectData = ReadContractResult<TAbi, TFunctionName>,
> = PartialBy<
  ReadContractConfig<TAbi, TFunctionName>,
  'abi' | 'address' | 'args' | 'blockNumber' | 'blockTag' | 'functionName'
> &
  QueryConfigWithSelect<
    ReadContractResult<TAbi, TFunctionName>,
    Error,
    TSelectData
  > & {
    /** If set to `true`, the cache will depend on the block number */
    cacheOnBlock?: boolean
  } & (
    | {
        /** Block number to read against. */
        blockNumber?: ReadContractConfig['blockNumber']
        blockTag?: never
        watch?: never
      }
    | {
        blockNumber?: never
        /** Block tag to read against. */
        blockTag?: ReadContractConfig['blockTag']
        watch?: never
      }
    | {
        blockNumber?: never
        blockTag?: never
        /** Refresh on incoming blocks. */
        watch?: boolean
      }
  )

type QueryKeyArgs = Omit<ReadContractConfig, 'abi'>
type QueryKeyConfig = Pick<UseContractReadConfig, 'scopeKey'> & {
  blockNumber?: bigint
}

function queryKey({
  address,
  args,
  blockNumber,
  blockTag,
  chainId,
  functionName,
  scopeKey,
}: QueryKeyArgs & QueryKeyConfig) {
  return [
    {
      entity: 'readContract',
      address,
      args,
      blockNumber,
      blockTag,
      chainId,
      functionName,
      scopeKey,
    },
  ] as const
}

function queryFn<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
>({ abi }: { abi?: Abi | readonly unknown[] }) {
  return async ({
    queryKey: [{ address, args, blockNumber, blockTag, chainId, functionName }],
  }: QueryFunctionArgs<typeof queryKey>) => {
    if (!abi) throw new Error('abi is required')
    if (!address) throw new Error('address is required')
    return ((await readContract({
      address,
      args,
      blockNumber,
      blockTag,
      chainId,
      // TODO: Remove cast and still support `Narrow<TAbi>`
      abi: abi as Abi,
      functionName,
    })) ?? null) as ReadContractResult<TAbi, TFunctionName>
  }
}

export function useContractRead<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
  TSelectData = ReadContractResult<TAbi, TFunctionName>,
>(
  {
    abi,
    address,
    args,
    blockNumber: blockNumberOverride,
    blockTag,
    cacheOnBlock = false,
    cacheTime,
    chainId: chainId_,
    enabled: enabled_ = true,
    functionName,
    isDataEqual,
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
  }: UseContractReadConfig<TAbi, TFunctionName, TSelectData> = {} as any,
) {
  const chainId = useChainId({ chainId: chainId_ })
  const { data: blockNumber_ } = useBlockNumber({
    chainId,
    enabled: watch || cacheOnBlock,
    scopeKey: watch || cacheOnBlock ? undefined : 'idle',
    watch,
  })

  const blockNumber = blockNumberOverride ?? blockNumber_

  const queryKey_ = React.useMemo(
    () =>
      queryKey({
        address,
        args,
        blockNumber: cacheOnBlock ? blockNumber : undefined,
        blockTag,
        chainId,
        functionName,
        scopeKey,
      } as Omit<ReadContractConfig, 'abi'>),
    [
      address,
      args,
      blockNumber,
      blockTag,
      cacheOnBlock,
      chainId,
      functionName,
      scopeKey,
    ],
  )

  const enabled = React.useMemo(() => {
    let enabled = Boolean(enabled_ && abi && address && functionName)
    if (cacheOnBlock) enabled = Boolean(enabled && blockNumber)
    return enabled
  }, [abi, address, blockNumber, cacheOnBlock, enabled_, functionName])

  useInvalidateOnBlock({
    chainId,
    enabled: Boolean(enabled && watch && !cacheOnBlock),
    queryKey: queryKey_,
  })

  return useQuery(
    queryKey_,
    queryFn({
      // TODO: Remove cast and still support `Narrow<TAbi>`
      abi: abi as Abi,
    }),
    {
      cacheTime,
      enabled,
      isDataEqual,
      select,
      staleTime,
      structuralSharing,
      suspense,
      onError,
      onSettled,
      onSuccess,
    },
  )
}
