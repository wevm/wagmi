'use client'

import {
  type Config,
  type PrepareTransactionRequestErrorType,
  type ResolvedRegister,
} from '@wagmi/core'
import {
  type PrepareTransactionRequestData,
  type PrepareTransactionRequestOptions,
  type PrepareTransactionRequestQueryKey,
  prepareTransactionRequestQueryOptions,
} from '@wagmi/core/query'
import type { PrepareTransactionRequestQueryFnData } from '@wagmi/core/query'
import { type PrepareTransactionRequestParameterType as viem_PrepareTransactionRequestParameterType } from 'viem'

import {
  type ConfigParameter,
  type QueryParameter,
} from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UsePrepareTransactionRequestParameters<
  parameterType extends viem_PrepareTransactionRequestParameterType = viem_PrepareTransactionRequestParameterType,
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
  selectData = PrepareTransactionRequestData<parameterType, config, chainId>,
> = PrepareTransactionRequestOptions<parameterType, config, chainId> &
  ConfigParameter<config> &
  QueryParameter<
    PrepareTransactionRequestQueryFnData<parameterType, config, chainId>,
    PrepareTransactionRequestErrorType,
    selectData,
    PrepareTransactionRequestQueryKey<parameterType, config, chainId>
  >

export type UsePrepareTransactionRequestReturnType<
  parameterType extends viem_PrepareTransactionRequestParameterType = viem_PrepareTransactionRequestParameterType,
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
  selectData = PrepareTransactionRequestData<parameterType, config, chainId>,
> = UseQueryReturnType<selectData, PrepareTransactionRequestErrorType>

/** https://wagmi.sh/react/api/hooks/usePrepareTransactionRequest */
export function usePrepareTransactionRequest<
  parameterType extends viem_PrepareTransactionRequestParameterType,
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] | undefined = undefined,
  selectData = PrepareTransactionRequestData<parameterType, config, chainId>,
>(
  parameters: UsePrepareTransactionRequestParameters<
    parameterType,
    config,
    chainId,
    selectData
  > = {} as any,
): UsePrepareTransactionRequestReturnType<
  parameterType,
  config,
  chainId,
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
    parameterType,
    config,
    chainId,
    selectData
  >
}
