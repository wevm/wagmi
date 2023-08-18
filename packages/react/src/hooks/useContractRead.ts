import { type ReadContractError, type ResolvedRegister } from '@wagmi/core'
import { type Evaluate } from '@wagmi/core/internal'
import {
  type ReadContractData,
  type ReadContractOptions,
  type ReadContractQueryFnData,
  type ReadContractQueryKey,
  readContractQueryOptions,
} from '@wagmi/core/query'
import { type Abi } from 'viem'

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
    >
>

export type UseContractReadReturnType<
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends string = string,
  selectData = ReadContractData<abi, functionName>,
> = UseQueryResult<selectData, ReadContractError>

/** https://wagmi.sh/react/hooks/useContractRead */
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
  const { address, abi, functionName, ...query } = parameters
  const config = useConfig()

  const chainId = parameters.chainId ?? useChainId()
  const queryOptions = readContractQueryOptions(config, {
    ...parameters,
    chainId,
  } as ReadContractOptions<ResolvedRegister['config'], abi, functionName>)
  const enabled = Boolean(
    address && abi && functionName && (parameters.enabled ?? true),
  )

  return useQuery({
    ...queryOptions,
    ...(query as any),
    enabled,
    structuralSharing: query.structuralSharing ?? structuralSharing,
  }) as UseContractReadReturnType<abi, functionName, selectData>
}
