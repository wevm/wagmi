import {
  QueryFilterConfig,
  QueryFilterResult,
  deepEqual,
  queryFilter,
} from '@wagmi/core'
import { Abi } from 'abitype'
import * as React from 'react'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { useBlockNumber } from '../network-status'
import { useChainId, useInvalidateOnBlock, useQuery } from '../utils'

export type UseQueryFilterConfig<
  TAbi = Abi,
  TEventName = string,
> = QueryFilterConfig<
  TAbi,
  TEventName,
  { isAddressOptional: true; isArgsOptional: true; withListener: false }
> &
  QueryConfig<QueryFilterResult<TAbi, TEventName>, Error> & {
    /** If set to `true`, the cache will depend on the block number */
    cacheOnBlock?: boolean
    /** Subscribe to changes */
    watch?: boolean
  }

function queryKey<TAbi = Abi, TEventName = string>(
  {
    addressOrName,
    args,
    chainId,
    eventName,
    fromBlockOrBlockhash,
    toBlock,
  }: Omit<
    QueryFilterConfig<
      TAbi,
      TEventName,
      { isAddressOptional: true; isArgsOptional: true; withListener: false }
    >,
    'contractInterface'
  >,
  { blockNumber }: { blockNumber?: number },
) {
  return [
    {
      entity: 'queryFilter',
      addressOrName,
      args,
      blockNumber,
      chainId,
      eventName,
      fromBlockOrBlockhash,
      toBlock,
    },
  ] as const
}

function queryFn({
  contractInterface,
}: {
  contractInterface: Abi | readonly unknown[]
}) {
  return async ({
    queryKey: [
      {
        addressOrName,
        args,
        chainId,
        eventName,
        fromBlockOrBlockhash,
        toBlock,
      },
    ],
  }: QueryFunctionArgs<typeof queryKey>) => {
    if (!addressOrName) throw new Error('addressOrName is required')
    return (
      (await queryFilter({
        addressOrName,
        args,
        chainId,
        contractInterface,
        eventName,
        fromBlockOrBlockhash,
        toBlock,
      })) ?? null
    )
  }
}

export function useQueryFilter<
  TAbi extends Abi | readonly unknown[],
  TEventName extends string,
>({
  addressOrName,
  contractInterface,
  eventName,
  args,
  chainId: chainId_,
  fromBlockOrBlockhash,
  toBlock,
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
}: UseQueryFilterConfig<TAbi, TEventName>) {
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
          eventName,
          fromBlockOrBlockhash,
          toBlock,
        },
        { blockNumber: cacheOnBlock ? blockNumber : undefined },
      ),
    [
      addressOrName,
      args,
      blockNumber,
      cacheOnBlock,
      chainId,
      eventName,
      fromBlockOrBlockhash,
      toBlock,
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

  return useQuery(queryKey_, queryFn({ contractInterface }) as any, {
    cacheTime,
    enabled,
    isDataEqual,
    select,
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess,
  })
}
