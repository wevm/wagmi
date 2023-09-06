'use client'

import type { Config, GetTransactionError, ResolvedRegister } from '@wagmi/core'
import { type Evaluate } from '@wagmi/core/internal'
import {
  type GetTransactionData,
  type GetTransactionOptions,
  type GetTransactionQueryFnData,
  type GetTransactionQueryKey,
  getTransactionQueryOptions,
} from '@wagmi/core/query'

import type { ConfigParameter } from '../types/properties.js'
import {
  type UseQueryParameters,
  type UseQueryResult,
  useQuery,
} from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseTransactionParameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetTransactionData<config, chainId>,
> = Evaluate<
  GetTransactionOptions<config, chainId> &
    UseQueryParameters<
      GetTransactionQueryFnData<config, chainId>,
      GetTransactionError,
      selectData,
      GetTransactionQueryKey<config, chainId>
    > &
    ConfigParameter<config>
>

export type UseTransactionReturnType<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetTransactionData<config, chainId>,
> = UseQueryResult<selectData, GetTransactionError>

/** https://alpha.wagmi.sh/react/hooks/useTransaction */
export function useTransaction<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetTransactionData<config, chainId>,
>(
  parameters: UseTransactionParameters<config, chainId, selectData> = {},
): UseTransactionReturnType<config, chainId, selectData> {
  const { blockHash, blockNumber, blockTag, hash, ...query } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId()

  const queryOptions = getTransactionQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })
  const enabled = Boolean(
    !(blockHash && blockNumber && blockTag && hash) &&
      (parameters.enabled ?? true),
  )

  return useQuery({ ...queryOptions, ...query, enabled })
}
