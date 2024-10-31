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

import { type CreateQueryReturnType, createQuery } from '$lib/query.svelte.js'
import type { RuneParameters, RuneReturnType } from '$lib/types.js'
import type { ConfigParameter, QueryParameter } from '../types.js'
import { useChainId } from './useChainId.svelte.js'
import { useConfig } from './useConfig.svelte.js'

export type UseWaitForTransactionReceiptParameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = WaitForTransactionReceiptData<config, chainId>,
> = RuneParameters<
  Compute<
    WaitForTransactionReceiptOptions<config, chainId> &
      ConfigParameter<config> &
      QueryParameter<
        WaitForTransactionReceiptQueryFnData<config, chainId>,
        WaitForTransactionReceiptErrorType,
        selectData,
        WaitForTransactionReceiptQueryKey<config, chainId>
      >
  >
>

export type UseWaitForTransactionReceiptReturnType<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = WaitForTransactionReceiptData<config, chainId>,
> = RuneReturnType<
  CreateQueryReturnType<selectData, WaitForTransactionReceiptErrorType>
>

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
  > = () => ({}),
): UseWaitForTransactionReceiptReturnType<config, chainId, selectData> {
  const { hash, query = {} } = $derived(parameters())

  const config = $derived.by(useConfig(parameters))
  const chainId = $derived.by(useChainId(() => ({ config })))

  const options = $derived(
    waitForTransactionReceiptQueryOptions(config, {
      ...parameters(),
      chainId: parameters().chainId ?? chainId,
    }),
  )
  const enabled = $derived(Boolean(hash && (query.enabled ?? true)))

  return createQuery(() => ({
    ...(query as any),
    ...options,
    enabled,
  }))
}
