'use client'

import type {
  Config,
  PrepareTransactionRequestErrorType,
  ResolvedRegister,
  SelectChains,
} from '@wagmi/core'
import {
  type PrepareTransactionRequestData,
  type PrepareTransactionRequestOptions,
  type PrepareTransactionRequestQueryKey,
  prepareTransactionRequestQueryOptions,
} from '@wagmi/core/query'
import type { PrepareTransactionRequestQueryFnData } from '@wagmi/core/query'
import type { PrepareTransactionRequestRequest as viem_PrepareTransactionRequestRequest } from 'viem'

import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UsePrepareTransactionRequestParameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
  request extends viem_PrepareTransactionRequestRequest<
    SelectChains<config, chainId>[0],
    SelectChains<config, chainId>[0]
  > = viem_PrepareTransactionRequestRequest<
    SelectChains<config, chainId>[0],
    SelectChains<config, chainId>[0]
  >,
  selectData = PrepareTransactionRequestData<config, chainId, request>,
> = PrepareTransactionRequestOptions<config, chainId, request> &
  ConfigParameter<config> &
  QueryParameter<
    PrepareTransactionRequestQueryFnData<config, chainId, request>,
    PrepareTransactionRequestErrorType,
    selectData,
    PrepareTransactionRequestQueryKey<config, chainId, request>
  >

export type UsePrepareTransactionRequestReturnType<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
  request extends viem_PrepareTransactionRequestRequest<
    SelectChains<config, chainId>[0],
    SelectChains<config, chainId>[0]
  > = viem_PrepareTransactionRequestRequest<
    SelectChains<config, chainId>[0],
    SelectChains<config, chainId>[0]
  >,
  selectData = PrepareTransactionRequestData<config, chainId, request>,
> = UseQueryReturnType<selectData, PrepareTransactionRequestErrorType>

/** https://wagmi.sh/react/api/hooks/usePrepareTransactionRequest */
export function usePrepareTransactionRequest<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] | undefined = undefined,
  request extends viem_PrepareTransactionRequestRequest<
    SelectChains<config, chainId>[0],
    SelectChains<config, chainId>[0]
  > = viem_PrepareTransactionRequestRequest<
    SelectChains<config, chainId>[0],
    SelectChains<config, chainId>[0]
  >,
  selectData = PrepareTransactionRequestData<config, chainId, request>,
>(
  parameters: UsePrepareTransactionRequestParameters<
    config,
    chainId,
    request,
    selectData
  > = {} as any,
): UsePrepareTransactionRequestReturnType<
  config,
  chainId,
  request,
  selectData
> {
  const { to, query = {} } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId({ config })

  const options = prepareTransactionRequestQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  } as PrepareTransactionRequestOptions<config, chainId, request>)
  const enabled = Boolean(to && (query.enabled ?? true))

  return useQuery({
    ...(query as any),
    ...options,
    enabled,
  }) as UsePrepareTransactionRequestReturnType<
    config,
    chainId,
    request,
    selectData
  >
}
