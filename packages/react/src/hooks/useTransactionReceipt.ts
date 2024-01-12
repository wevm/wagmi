'use client'

import {
  type Config,
  type GetTransactionReceiptErrorType,
  type ResolvedRegister,
} from '@wagmi/core'
import { type Evaluate } from '@wagmi/core/internal'
import {
  type GetTransactionReceiptData,
  type GetTransactionReceiptOptions,
  type GetTransactionReceiptQueryKey,
  getTransactionReceiptQueryOptions,
} from '@wagmi/core/query'
import { type GetTransactionReceiptQueryFnData } from '@wagmi/core/query'
import {
  type ConfigParameter,
  type QueryParameter,
} from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseTransactionReceiptParameters<
  config extends Config = Config,
  selectData = GetTransactionReceiptData,
> = Evaluate<
  GetTransactionReceiptOptions<config> &
    ConfigParameter<config> &
    QueryParameter<
      GetTransactionReceiptQueryFnData,
      GetTransactionReceiptErrorType,
      selectData,
      GetTransactionReceiptQueryKey
    >
>

export type UseTransactionReceiptReturnType<
  selectData = GetTransactionReceiptData,
> = UseQueryReturnType<selectData, GetTransactionReceiptErrorType>

/** https://wagmi.sh/react/api/hooks/useTransactionReceipt */
export function useTransactionReceipt<
  config extends Config = ResolvedRegister['config'],
  selectData = GetTransactionReceiptData,
>(
  parameters: UseTransactionReceiptParameters<config, selectData> = {},
): UseTransactionReceiptReturnType<selectData> {
  const { hash, query = {} } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId()

  const options = getTransactionReceiptQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })
  const enabled = Boolean(hash && (query.enabled ?? true))

  return useQuery({ ...query, ...options, enabled })
}
