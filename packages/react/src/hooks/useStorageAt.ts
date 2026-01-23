'use client'
import type {
  Config,
  GetStorageAtErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type GetStorageAtData,
  type GetStorageAtOptions,
  getStorageAtQueryOptions,
} from '@wagmi/core/query'
import type { ConfigParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseStorageAtParameters<
  config extends Config = Config,
  selectData = GetStorageAtData,
> = Compute<GetStorageAtOptions<config, selectData> & ConfigParameter<config>>

export type UseStorageAtReturnType<selectData = GetStorageAtData> =
  UseQueryReturnType<selectData, GetStorageAtErrorType>

/** https://wagmi.sh/react/api/hooks/useStorageAt */
export function useStorageAt<
  config extends Config = ResolvedRegister['config'],
  selectData = GetStorageAtData,
>(
  parameters: UseStorageAtParameters<config, selectData> = {},
): UseStorageAtReturnType<selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const options = getStorageAtQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })
  return useQuery(options)
}
