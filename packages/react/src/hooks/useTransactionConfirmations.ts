'use client'

import type {
  Config,
  GetTransactionConfirmationsErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import {
  type GetTransactionConfirmationsData,
  type GetTransactionConfirmationsOptions,
  type GetTransactionConfirmationsQueryFnData,
  type GetTransactionConfirmationsQueryKey,
  getTransactionConfirmationsQueryOptions,
} from '@wagmi/core/query'

import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseTransactionConfirmationsParameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
  selectData = GetTransactionConfirmationsData,
> = GetTransactionConfirmationsOptions<config, chainId> &
  ConfigParameter<config> &
  QueryParameter<
    GetTransactionConfirmationsQueryFnData,
    GetTransactionConfirmationsErrorType,
    selectData,
    GetTransactionConfirmationsQueryKey<config, chainId>
  >

export type UseTransactionConfirmationsReturnType<
  selectData = GetTransactionConfirmationsData,
> = UseQueryReturnType<selectData, GetTransactionConfirmationsErrorType>

/** https://wagmi.sh/react/api/hooks/useTransactionConfirmations */
export function useTransactionConfirmations<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] | undefined = undefined,
  selectData = GetTransactionConfirmationsData,
>(
  parameters: UseTransactionConfirmationsParameters<
    config,
    chainId,
    selectData
  > = {} as any,
): UseTransactionConfirmationsReturnType<selectData> {
  const { hash, transactionReceipt, query = {} } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId({ config })

  const options = getTransactionConfirmationsQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })
  const enabled = Boolean(
    !(hash && transactionReceipt) &&
      (hash || transactionReceipt) &&
      (query.enabled ?? true),
  )

  return useQuery({ ...query, ...options, enabled })
}
