'use client'

import type {
  Config,
  ResolvedRegister,
  WaitForTransactionReceiptErrorType,
} from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type WaitForTransactionReceiptData,
  type WaitForTransactionReceiptOptions,
  type WaitForTransactionReceiptQueryFnData,
  type WaitForTransactionReceiptQueryKey,
  waitForTransactionReceiptQueryOptions,
} from '@wagmi/core/query'

import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseWaitForTransactionReceiptParameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = WaitForTransactionReceiptData<config, chainId>,
> = Compute<
  WaitForTransactionReceiptOptions<config, chainId> &
    ConfigParameter<config> &
    QueryParameter<
      WaitForTransactionReceiptQueryFnData<config, chainId>,
      WaitForTransactionReceiptErrorType,
      selectData,
      WaitForTransactionReceiptQueryKey<config, chainId>
    >
>

export type UseWaitForTransactionReceiptReturnType<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = WaitForTransactionReceiptData<config, chainId>,
> = UseQueryReturnType<selectData, WaitForTransactionReceiptErrorType>

/** https://wagmi.sh/react/api/hooks/useWaitForTransactionReceipt */
export function useWaitForTransactionReceipt<
  config extends Config = ResolvedRegister['config'],
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = WaitForTransactionReceiptData<config, chainId>,
>(
  parameters: UseWaitForTransactionReceiptParameters<
    config,
    chainId,
    selectData
  > = {},
): UseWaitForTransactionReceiptReturnType<config, chainId, selectData> {
  const { hash, query = {} } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId({ config })

  const options = waitForTransactionReceiptQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })
  const enabled = Boolean(hash && (query.enabled ?? true))

  return useQuery({
    ...(query as any),
    ...options,
    enabled,
  }) as UseWaitForTransactionReceiptReturnType<config, chainId, selectData>
}
