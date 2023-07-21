import type { PrepareSendTransactionError, ResolvedRegister } from '@wagmi/core'
import {
  type PrepareSendTransactionData,
  type PrepareSendTransactionOptions,
  type PrepareSendTransactionQueryFnData,
  type PrepareSendTransactionQueryKey,
  prepareSendTransactionQueryOptions,
} from '@wagmi/core/query'

import {
  type UseQueryParameters,
  type UseQueryResult,
  useQuery,
} from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

type ChainId = ResolvedRegister['config']['chains'][number]['id']

export type UsePrepareSendTransactionParameters<
  chainId extends ChainId | undefined = undefined,
  selectData = PrepareSendTransactionData<ResolvedRegister['config'], chainId>,
> = PrepareSendTransactionOptions<ResolvedRegister['config'], chainId> &
  UseQueryParameters<
    PrepareSendTransactionQueryFnData<ResolvedRegister['config'], chainId>,
    PrepareSendTransactionError,
    selectData,
    PrepareSendTransactionQueryKey<ResolvedRegister['config'], chainId>
  >

export type UsePrepareSendTransactionReturnType<
  chainId extends ChainId | undefined = undefined,
  selectData = PrepareSendTransactionData<ResolvedRegister['config'], chainId>,
> = UseQueryResult<selectData, PrepareSendTransactionError>

/** https://wagmi.sh/react/hooks/usePrepareSendTransaction */
export function usePrepareSendTransaction<
  chainId extends ChainId | undefined = undefined,
  selectData = PrepareSendTransactionData<ResolvedRegister['config'], chainId>,
>(
  parameters: UsePrepareSendTransactionParameters<chainId, selectData> = {},
): UsePrepareSendTransactionReturnType<chainId, selectData> {
  const config = useConfig()

  const chainId = parameters.chainId ?? useChainId()
  const queryOptions = prepareSendTransactionQueryOptions(config, {
    ...parameters,
    chainId,
  })
  const enabled = Boolean(parameters.enabled ?? true)

  return useQuery({
    ...queryOptions,
    ...parameters,
    enabled,
  })
}
