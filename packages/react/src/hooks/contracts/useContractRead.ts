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
  { isAddressOptional: true; isArgsOptional: true }
> &
  QueryConfig<ReadContractResult<TAbi, TFunctionName>, Error> & {
    /** If set to `true`, the cache will depend on the block number */
    cacheOnBlock?: boolean
    /** Subscribe to changes */
    watch?: boolean
  }

function queryKey(
  {
    addressOrName,
    args,
    chainId,
    functionName,
    overrides,
  }: Omit<ReadContractConfig, 'contractInterface'>,
  { blockNumber }: { blockNumber?: number },
) {
  return [
    {
      entity: 'readContract',
      addressOrName,
      args,
      blockNumber,
      chainId,
      functionName,
      overrides,
    },
  ] as const
}

function queryFn({
  contractInterface,
}: {
  contractInterface: Abi | readonly unknown[]
}) {
  return async ({
    queryKey: [{ addressOrName, args, chainId, functionName, overrides }],
  }: QueryFunctionArgs<typeof queryKey>) => {
    if (!addressOrName) throw new Error('addressOrName is required')
    return (
      (await readContract({
        addressOrName,
        args,
        chainId,
        contractInterface,
        functionName,
        overrides,
      })) ?? null
    )
  }
}

export function useContractRead<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
>({
  addressOrName,
  contractInterface,
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
}: UseContractReadConfig<TAbi, TFunctionName>) {
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
          addressOrName,
          args,
          chainId,
          functionName,
          overrides,
        } as Omit<ReadContractConfig, 'contractInterface'>,
        { blockNumber: cacheOnBlock ? blockNumber : undefined },
      ),
    [
      addressOrName,
      args,
      blockNumber,
      cacheOnBlock,
      chainId,
      functionName,
      overrides,
    ],
  )

  const enabled = React.useMemo(() => {
    let enabled = Boolean(enabled_ && addressOrName)
    if (cacheOnBlock) enabled = Boolean(enabled && blockNumber)
    return enabled
  }, [addressOrName, blockNumber, cacheOnBlock, enabled_])

  useInvalidateOnBlock({
    chainId,
    enabled: watch && !cacheOnBlock,
    queryKey: queryKey_,
  })

  return useQuery(queryKey_, queryFn({ contractInterface }), {
    cacheTime,
    enabled,
    isDataEqual,
    select(data) {
      const result = parseContractResult({
        contractInterface,
        data,
        functionName,
      })
      return select ? select(result) : result
    },
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess,
  })
}
