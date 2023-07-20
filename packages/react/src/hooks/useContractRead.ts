import { useQueryClient } from '@tanstack/react-query'
import {
  type ReadContractError,
  type ResolvedRegister,
  watchBlockNumber,
} from '@wagmi/core'
import { type Evaluate } from '@wagmi/core/internal'
import {
  type ReadContractData,
  type ReadContractOptions,
  type ReadContractQueryKey,
  readContractQueryOptions,
} from '@wagmi/core/query'
import type { ReadContractQueryFnData } from '@wagmi/core/query'
import { useEffect } from 'react'
import type { Abi } from 'viem'

import type { WatchParameter } from '../types/properties.js'
import {
  type UseQueryParameters,
  type UseQueryResult,
  structuralSharing,
  useQuery,
} from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseContractReadParameters<
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends string = string,
  selectData = ReadContractData<abi, functionName>,
> = Evaluate<
  ReadContractOptions<ResolvedRegister['config'], abi, functionName> &
    UseQueryParameters<
      ReadContractQueryFnData<abi, functionName>,
      ReadContractError,
      selectData,
      ReadContractQueryKey<ResolvedRegister['config'], abi, functionName>
    > &
    WatchParameter
  // TODO: `cacheOnBlock`?
>

export type UseContractReadReturnType<
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends string = string,
  selectData = ReadContractData<abi, functionName>,
> = Evaluate<UseQueryResult<selectData, ReadContractError>>

// /** https://wagmi.sh/react/hooks/useContractRead */
export function useContractRead<
  const abi extends Abi | readonly unknown[],
  functionName extends string,
  selectData = ReadContractData<abi, functionName>,
>(
  parameters: UseContractReadParameters<
    abi,
    functionName,
    selectData
  > = {} as UseContractReadParameters<abi, functionName, selectData>,
): UseContractReadReturnType<abi, functionName, selectData> {
  const { address, abi, functionName, watch, ...query } = parameters
  const config = useConfig()
  const queryClient = useQueryClient()

  const chainId = parameters.chainId ?? useChainId()
  const queryOptions = readContractQueryOptions(config, {
    ...parameters,
    chainId,
  } as ReadContractOptions<ResolvedRegister['config'], abi, functionName>)
  const enabled = Boolean(
    address && abi && functionName && (parameters.enabled ?? true),
  )

  useEffect(() => {
    if (!enabled) return
    if (!watch) return

    return watchBlockNumber(config, {
      chainId,
      onBlockNumber() {
        queryClient.invalidateQueries({
          queryKey: queryOptions.queryKey,
        })
      },
      syncConnectedChain: false,
    })
  }, [chainId, config, enabled, queryClient, queryOptions, watch])

  return useQuery({
    ...queryOptions,
    ...(query as any),
    enabled,
    structuralSharing: query.structuralSharing ?? structuralSharing,
  }) as UseContractReadReturnType<abi, functionName, selectData>
}
