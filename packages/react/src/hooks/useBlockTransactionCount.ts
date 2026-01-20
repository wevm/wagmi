'use client'
import type {
  Config,
  GetBlockTransactionCountErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { UnionCompute } from '@wagmi/core/internal'
import {
  type GetBlockTransactionCountData,
  type GetBlockTransactionCountOptions,
  getBlockTransactionCountQueryOptions,
} from '@wagmi/core/query'
import type { ConfigParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseBlockTransactionCountParameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetBlockTransactionCountData,
> = UnionCompute<
  GetBlockTransactionCountOptions<config, chainId, selectData> &
    ConfigParameter<config>
>

export type UseBlockTransactionCountReturnType<
  selectData = GetBlockTransactionCountData,
> = UseQueryReturnType<selectData, GetBlockTransactionCountErrorType>

/** https://wagmi.sh/react/api/hooks/useBlockTransactionCount */
export function useBlockTransactionCount<
  config extends Config = ResolvedRegister['config'],
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetBlockTransactionCountData,
>(
  parameters: UseBlockTransactionCountParameters<
    config,
    chainId,
    selectData
  > = {},
): UseBlockTransactionCountReturnType<selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const options = getBlockTransactionCountQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })
  return useQuery(options)
}
