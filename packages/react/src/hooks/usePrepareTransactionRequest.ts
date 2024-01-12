'use client'

import {
  type Config,
  type PrepareTransactionRequestErrorType,
  type ResolvedRegister,
} from '@wagmi/core'
import { type Evaluate } from '@wagmi/core/internal'
import {
  type PrepareTransactionRequestData,
  type PrepareTransactionRequestOptions,
  type PrepareTransactionRequestQueryKey,
  prepareTransactionRequestQueryOptions,
} from '@wagmi/core/query'
import { type PrepareTransactionRequestQueryFnData } from '@wagmi/core/query'
import {
  type ConfigParameter,
  type QueryParameter,
} from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UsePrepareTransactionRequestParameters<
  config extends Config = Config,
  selectData = PrepareTransactionRequestData,
> = Evaluate<
  PrepareTransactionRequestOptions<config> &
    ConfigParameter<config> &
    QueryParameter<
      PrepareTransactionRequestQueryFnData,
      PrepareTransactionRequestErrorType,
      selectData,
      PrepareTransactionRequestQueryKey
    >
>

export type UsePrepareTransactionRequestReturnType<
  selectData = PrepareTransactionRequestData,
> = UseQueryReturnType<selectData, PrepareTransactionRequestErrorType>

/** https://wagmi.sh/react/api/hooks/usePrepareTransactionRequest */
export function usePrepareTransactionRequest<
  config extends Config = ResolvedRegister['config'],
  selectData = PrepareTransactionRequestData,
>(
  parameters: UsePrepareTransactionRequestParameters<config, selectData> = {},
): UsePrepareTransactionRequestReturnType<selectData> {
  const { query = {} } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId()

  const options = prepareTransactionRequestQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })

  return useQuery({ ...query, ...options })
}
