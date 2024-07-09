'use client'

import type {
  Config,
  GetTransactionCountErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import type { GetTransactionCountQueryFnData } from '@wagmi/core/query'
import {
  type GetTransactionCountData,
  type GetTransactionCountOptions,
  type GetTransactionCountQueryKey,
  getTransactionCountQueryOptions,
} from '@wagmi/core/query'

import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseTransactionCountParameters<
  config extends Config = Config,
  selectData = GetTransactionCountData,
> = Compute<
  GetTransactionCountOptions<config> &
    ConfigParameter<config> &
    QueryParameter<
      GetTransactionCountQueryFnData,
      GetTransactionCountErrorType,
      selectData,
      GetTransactionCountQueryKey<config>
    >
>

export type UseTransactionCountReturnType<
  selectData = GetTransactionCountData,
> = UseQueryReturnType<selectData, GetTransactionCountErrorType>

/** https://wagmi.sh/react/api/hooks/useTransactionCount */
export function useTransactionCount<
  config extends Config = ResolvedRegister['config'],
  selectData = GetTransactionCountData,
>(
  parameters: UseTransactionCountParameters<config, selectData> = {},
): UseTransactionCountReturnType<selectData> {
  const { address, query = {} } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId({ config })

  const options = getTransactionCountQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })
  const enabled = Boolean(address && (query.enabled ?? true))

  return useQuery({ ...query, ...options, enabled })
}
