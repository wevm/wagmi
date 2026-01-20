'use client'
import type {
  Config,
  GetGasPriceErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type GetGasPriceData,
  type GetGasPriceOptions,
  getGasPriceQueryOptions,
} from '@wagmi/core/query'
import type { ConfigParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseGasPriceParameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetGasPriceData,
> = Compute<
  GetGasPriceOptions<config, chainId, selectData> & ConfigParameter<config>
>

export type UseGasPriceReturnType<selectData = GetGasPriceData> =
  UseQueryReturnType<selectData, GetGasPriceErrorType>

/** https://wagmi.sh/react/api/hooks/useGasPrice */
export function useGasPrice<
  config extends Config = ResolvedRegister['config'],
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetGasPriceData,
>(
  parameters: UseGasPriceParameters<config, chainId, selectData> = {},
): UseGasPriceReturnType<selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const options = getGasPriceQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })
  return useQuery(options)
}
