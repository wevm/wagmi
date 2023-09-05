'use client'

import type {
  Config,
  ResolvedRegister,
  WaitForTransactionReceiptError,
} from '@wagmi/core'
import { type Evaluate } from '@wagmi/core/internal'
import {
  type WaitForTransactionReceiptData,
  type WaitForTransactionReceiptOptions,
  type WaitForTransactionReceiptQueryFnData,
  type WaitForTransactionReceiptQueryKey,
  waitForTransactionReceiptQueryOptions,
} from '@wagmi/core/query'

import type { ConfigParameter } from '../types/properties.js'
import {
  type UseQueryParameters,
  type UseQueryResult,
  useQuery,
} from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseWaitForTransactionReceiptParameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = WaitForTransactionReceiptData<config, chainId>,
> = Evaluate<
  WaitForTransactionReceiptOptions<config, chainId> &
    UseQueryParameters<
      WaitForTransactionReceiptQueryFnData<config, chainId>,
      WaitForTransactionReceiptError,
      selectData,
      WaitForTransactionReceiptQueryKey<config, chainId>
    > &
    ConfigParameter<config>
>

export type UseWaitForTransactionReceiptReturnType<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = WaitForTransactionReceiptData<config, chainId>,
> = UseQueryResult<selectData, WaitForTransactionReceiptError>

/** https://alpha.wagmi.sh/react/hooks/useWaitForTransactionReceipt */
export function useWaitForTransactionReceipt<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = WaitForTransactionReceiptData<config, chainId>,
>(
  parameters: UseWaitForTransactionReceiptParameters<
    config,
    chainId,
    selectData
  > = {},
): UseWaitForTransactionReceiptReturnType<config, chainId, selectData> {
  const { hash, ...query } = parameters
  const config = useConfig(parameters)

  const chainId = useChainId()
  const queryOptions = waitForTransactionReceiptQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })
  const enabled = Boolean(!hash && (parameters.enabled ?? true))

  return useQuery({
    ...queryOptions,
    ...query,
    enabled,
  })
}
