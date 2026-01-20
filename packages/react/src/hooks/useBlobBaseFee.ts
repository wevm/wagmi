'use client'
import type {
  Config,
  GetBlobBaseFeeErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type GetBlobBaseFeeData,
  type GetBlobBaseFeeOptions,
  getBlobBaseFeeQueryOptions,
} from '@wagmi/core/query'
import type { ConfigParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseBlobBaseFeeParameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetBlobBaseFeeData,
> = Compute<
  GetBlobBaseFeeOptions<config, chainId, selectData> & ConfigParameter<config>
>

export type UseBlobBaseFeeReturnType<selectData = GetBlobBaseFeeData> =
  UseQueryReturnType<selectData, GetBlobBaseFeeErrorType>

/** https://wagmi.sh/react/api/hooks/useBlobBaseFee */
export function useBlobBaseFee<
  config extends Config = ResolvedRegister['config'],
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetBlobBaseFeeData,
>(
  parameters: UseBlobBaseFeeParameters<config, chainId, selectData> = {},
): UseBlobBaseFeeReturnType<selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const options = getBlobBaseFeeQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })
  return useQuery(options)
}
