'use client'
import type {
  Config,
  GetTransactionConfirmationsErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import {
  type GetTransactionConfirmationsData,
  type GetTransactionConfirmationsOptions,
  getTransactionConfirmationsQueryOptions,
} from '@wagmi/core/query'
import type { ConfigParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseTransactionConfirmationsParameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
  selectData = GetTransactionConfirmationsData,
> = GetTransactionConfirmationsOptions<config, chainId, selectData> &
  ConfigParameter<config>

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
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const options = getTransactionConfirmationsQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })
  return useQuery(options) as any
}
