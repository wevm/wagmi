import {
  ReadContractConfig,
  ReadContractResult,
  deepEqual,
  parseContractResult,
  readContract,
} from '@wagmi/core'
import { Abi } from 'abitype'
import * as React from 'react'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { useBlockNumber } from '../network-status'
import { useChainId, useInvalidateOnBlock, useQuery } from '../utils'

export type UseContractReadConfig<
  TAbi = Abi,
  TFunctionName = string,
> = ReadContractConfig<
  TAbi,
  TFunctionName,
  {
    isAbiOptional: true
    isAddressOptional: true
    isArgsOptional: true
    isFunctionNameOptional: true
  }
> &
  QueryConfig<ReadContractResult<TAbi, TFunctionName>, Error> & {
    /** If set to `true`, the cache will depend on the block number */
    cacheOnBlock?: boolean
    /** Subscribe to changes */
    watch?: boolean
  }

function queryKey(
  {
    address,
    args,
    chainId,
    functionName,
    overrides,
  }: Omit<ReadContractConfig, 'abi'>,
  { blockNumber }: { blockNumber?: number },
) {
  return [
    {
      entity: 'readContract',
      address,
      args,
      blockNumber,
      chainId,
      functionName,
      overrides,
    },
  ] as const
}

function queryFn<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
>({ abi }: { abi?: Abi | readonly unknown[] }) {
  return async ({
    queryKey: [{ address, args, chainId, functionName, overrides }],
  }: QueryFunctionArgs<typeof queryKey>) => {
    if (!abi) throw new Error('abi is required')
    if (!address) throw new Error('address is required')
    return ((await readContract({
      address,
      args,
      chainId,
      // TODO: Remove cast and still support `Narrow<TAbi>`
      abi: abi as Abi,
      functionName,
      overrides,
    })) ?? null) as ReadContractResult<TAbi, TFunctionName>
  }
}

export function useContractRead<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
>(
  {
    abi,
    address,
    functionName,
    args,
    chainId: chainId_,
    overrides,
    cacheOnBlock = false,
    cacheTime,
    enabled: enabled_ = true,
    isDataEqual = deepEqual,
    select,
    staleTime,
    suspense,
    watch,
    onError,
    onSettled,
    onSuccess,
  }: UseContractReadConfig<TAbi, TFunctionName> = {} as any,
) {
  const chainId = useChainId({ chainId: chainId_ })
  const { data: blockNumber } = useBlockNumber({
    chainId,
    enabled: watch || cacheOnBlock,
    watch,
  })

  const queryKey_ = React.useMemo(
    () =>
      queryKey(
        {
          address,
          args,
          chainId,
          functionName,
          overrides,
        } as Omit<ReadContractConfig, 'abi'>,
        { blockNumber: cacheOnBlock ? blockNumber : undefined },
      ),
    [
      address,
      args,
      blockNumber,
      cacheOnBlock,
      chainId,
      functionName,
      overrides,
    ],
  )

  const enabled = React.useMemo(() => {
    let enabled = Boolean(enabled_ && abi && address && functionName)
    if (cacheOnBlock) enabled = Boolean(enabled && blockNumber)
    return enabled
  }, [abi, address, blockNumber, cacheOnBlock, enabled_, functionName])

  useInvalidateOnBlock({
    chainId,
    enabled: watch && !cacheOnBlock,
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
      select(data) {
        const result =
          abi && functionName
            ? parseContractResult({
                // TODO: Remove cast and still support `Narrow<TAbi>`
                abi: abi as Abi,
                data,
                functionName,
              })
            : data
        return select ? select(result) : result
      },
      staleTime,
      suspense,
      onError,
      onSettled,
      onSuccess,
    },
  )
}
