import type { GetTransactionError, ResolvedRegister } from '@wagmi/core'
import { type Evaluate } from '@wagmi/core/internal'
import {
  type GetTransactionData,
  type GetTransactionOptions,
  type GetTransactionQueryFnData,
  type GetTransactionQueryKey,
  getTransactionQueryOptions,
} from '@wagmi/core/query'

import {
  type UseQueryParameters,
  type UseQueryResult,
  useQuery,
} from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

type ChainId = ResolvedRegister['config']['chains'][number]['id']

export type UseTransactionParameters<
  chainId extends ChainId | undefined = undefined,
  selectData = GetTransactionData<ResolvedRegister['config'], chainId>,
> = Evaluate<
  GetTransactionOptions<ResolvedRegister['config'], chainId> &
    UseQueryParameters<
      GetTransactionQueryFnData<ResolvedRegister['config'], chainId>,
      GetTransactionError,
      selectData,
      GetTransactionQueryKey<ResolvedRegister['config'], chainId>
    >
>

export type UseTransactionReturnType<
  chainId extends ChainId | undefined = undefined,
  selectData = GetTransactionData<ResolvedRegister['config'], chainId>,
> = UseQueryResult<selectData, GetTransactionError>

/** https://wagmi.sh/react/hooks/useTransaction */
export function useTransaction<
  chainId extends ChainId | undefined = undefined,
  selectData = GetTransactionData<ResolvedRegister['config'], chainId>,
>(
  parameters: UseTransactionParameters<chainId, selectData> = {},
): UseTransactionReturnType<chainId, selectData> {
  const { blockHash, blockNumber, blockTag, hash, ...query } = parameters
  const config = useConfig()

  const chainId = parameters.chainId ?? useChainId()
  const queryOptions = getTransactionQueryOptions(config, {
    ...parameters,
    chainId,
  })
  const enabled = Boolean(
    !(blockHash && blockNumber && blockTag && hash) &&
      (parameters.enabled ?? true),
  )

  return useQuery({
    ...queryOptions,
    ...query,
    enabled,
  })
}
