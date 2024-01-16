'use client'

import {
  type Config,
  type PrepareTransactionRequestErrorType,
  type ResolvedRegister,
} from '@wagmi/core'
import { type Evaluate } from '@wagmi/core/internal'
import {
  type PrepareTransactionRequestData,
  type PrepareTransactionRequestOptions,
  type PrepareTransactionRequestQueryKey,
  prepareTransactionRequestQueryOptions,
} from '@wagmi/core/query'
import type { PrepareTransactionRequestQueryFnData } from '@wagmi/core/query'
import { type PrepareTransactionRequestParameterType as viem_PrepareTransactionRequestParameterType } from 'viem'
import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UsePrepareTransactionRequestParameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
  parameterType extends viem_PrepareTransactionRequestParameterType = viem_PrepareTransactionRequestParameterType,
  selectData = PrepareTransactionRequestData<config, chainId, parameterType>,
> = Evaluate<
  PrepareTransactionRequestOptions<config, chainId, parameterType> &
    ConfigParameter<config> &
    QueryParameter<
      PrepareTransactionRequestQueryFnData<config, chainId, parameterType>,
      PrepareTransactionRequestErrorType,
      selectData,
      PrepareTransactionRequestQueryKey<config, chainId, parameterType>
    >
>

export type UsePrepareTransactionRequestReturnType<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
  parameterType extends viem_PrepareTransactionRequestParameterType = viem_PrepareTransactionRequestParameterType,
  selectData = PrepareTransactionRequestData<config, chainId, parameterType>,
> = UseQueryReturnType<selectData, PrepareTransactionRequestErrorType>

/** https://wagmi.sh/react/api/hooks/usePrepareTransactionRequest */
export function usePrepareTransactionRequest<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
  parameterType extends viem_PrepareTransactionRequestParameterType = viem_PrepareTransactionRequestParameterType,
  selectData = PrepareTransactionRequestData<config, chainId, parameterType>,
>(
  parameters: UsePrepareTransactionRequestParameters<
    config,
    chainId,
    parameterType,
    selectData
  > = {} as any,
): UsePrepareTransactionRequestReturnType<
  config,
  chainId,
  parameterType,
  selectData
> {
  const { to, query = {} } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId()

  const options = prepareTransactionRequestQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })

  const enabled = Boolean(to && (query.enabled ?? true))

  return useQuery({
    ...(query as any),
    ...options,
    enabled,
  }) as UsePrepareTransactionRequestReturnType<
    config,
    chainId,
    parameterType,
    selectData
  >
}
