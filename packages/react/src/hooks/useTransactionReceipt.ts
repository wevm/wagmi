'use client'

import type {
  Config,
  GetTransactionReceiptErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import type { GetTransactionReceiptQueryFnData } from '@wagmi/core/query'
import {
  type GetTransactionReceiptData,
  type GetTransactionReceiptOptions,
  type GetTransactionReceiptQueryKey,
  getTransactionReceiptQueryOptions,
} from '@wagmi/core/query'
import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseTransactionReceiptParameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetTransactionReceiptData<config, chainId>,
> = Compute<
  GetTransactionReceiptOptions<config, chainId> &
    ConfigParameter<config> &
    QueryParameter<
      GetTransactionReceiptQueryFnData<config, chainId>,
      GetTransactionReceiptErrorType,
      selectData,
      GetTransactionReceiptQueryKey<config, chainId>
    >
>

export type UseTransactionReceiptReturnType<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetTransactionReceiptData<config, chainId>,
> = UseQueryReturnType<selectData, GetTransactionReceiptErrorType>

/** https://wagmi.sh/react/api/hooks/useTransactionReceipt */
export function useTransactionReceipt<
  config extends Config = ResolvedRegister['config'],
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetTransactionReceiptData<config, chainId>,
>(
  parameters: UseTransactionReceiptParameters<config, chainId, selectData> = {},
): UseTransactionReceiptReturnType<config, chainId, selectData> {
  const { hash, query = {} } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId({ config })

  const options = getTransactionReceiptQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })
  const enabled = Boolean(hash && (query.enabled ?? true))

  return useQuery({
    ...(query as any),
    ...options,
    enabled,
  }) as UseTransactionReceiptReturnType<config, chainId, selectData>
}
