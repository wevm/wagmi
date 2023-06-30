import type { WaitForTransactionReceiptError } from '@wagmi/core'
import { type Evaluate } from '@wagmi/core/internal'
import {
  type WaitForTransactionReceiptData,
  type WaitForTransactionReceiptOptions,
  type WaitForTransactionReceiptQueryFnData,
  type WaitForTransactionReceiptQueryKey,
  waitForTransactionReceiptQueryOptions,
} from '@wagmi/core/query'

import type { ResolvedRegister } from '../index.js'
import {
  type UseQueryParameters,
  type UseQueryResult,
  useQuery,
} from '../types/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

type ChainId = ResolvedRegister['config']['chains'][number]['id']

export type UseWaitForTransactionReceiptParameters<
  chainId extends ChainId | undefined = undefined,
  selectData = WaitForTransactionReceiptData<
    ResolvedRegister['config'],
    chainId
  >,
> = Evaluate<
  WaitForTransactionReceiptOptions<ResolvedRegister['config'], chainId> &
    UseQueryParameters<
      WaitForTransactionReceiptQueryFnData<ResolvedRegister['config'], chainId>,
      WaitForTransactionReceiptError,
      selectData,
      WaitForTransactionReceiptQueryKey<ResolvedRegister['config'], chainId>
    >
>

export type UseWaitForTransactionReceiptReturnType<
  chainId extends ChainId | undefined = undefined,
  selectData = WaitForTransactionReceiptData<
    ResolvedRegister['config'],
    chainId
  >,
> = UseQueryResult<selectData, WaitForTransactionReceiptError>

/** https://wagmi.sh/react/hooks/useWaitForTransactionReceipt */
export function useWaitForTransactionReceipt<
  chainId extends ChainId | undefined = undefined,
  selectData = WaitForTransactionReceiptData<
    ResolvedRegister['config'],
    chainId
  >,
>(
  parameters: UseWaitForTransactionReceiptParameters<chainId, selectData> = {},
): UseWaitForTransactionReceiptReturnType<chainId, selectData> {
  const { hash, ...query } = parameters
  const config = useConfig()

  const chainId = parameters.chainId ?? useChainId()
  const queryOptions = waitForTransactionReceiptQueryOptions(config, {
    ...parameters,
    chainId,
  })
  const enabled = Boolean(!hash && (parameters.enabled ?? true))

  return useQuery({
    ...queryOptions,
    ...query,
    enabled,
  })
}
