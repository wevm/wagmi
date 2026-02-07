import type {
  Config,
  GetTransactionErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { Compute, ConfigParameter } from '@wagmi/core/internal'
import {
  type GetTransactionData,
  type GetTransactionOptions,
  getTransactionQueryOptions,
} from '@wagmi/core/query'
import { type Accessor, createMemo } from 'solid-js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

/** https://wagmi.sh/solid/api/primitives/useTransaction */
export function useTransaction<
  config extends Config = ResolvedRegister['config'],
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetTransactionData<config, chainId>,
>(
  parameters: useTransaction.Parameters<
    config,
    chainId,
    selectData
  > = () => ({}),
): useTransaction.ReturnType<config, chainId, selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId(() => ({ config: config() }))
  const options = createMemo(() =>
    getTransactionQueryOptions(config(), {
      ...parameters(),
      chainId: parameters().chainId ?? chainId(),
    }),
  )
  return useQuery(options) as useTransaction.ReturnType<
    config,
    chainId,
    selectData
  >
}

export namespace useTransaction {
  export type Parameters<
    config extends Config = Config,
    chainId extends
      config['chains'][number]['id'] = config['chains'][number]['id'],
    selectData = GetTransactionData<config, chainId>,
  > = Accessor<SolidParameters<config, chainId, selectData>>

  export type ReturnType<
    config extends Config = Config,
    chainId extends
      config['chains'][number]['id'] = config['chains'][number]['id'],
    selectData = GetTransactionData<config, chainId>,
  > = UseQueryReturnType<selectData, GetTransactionErrorType>

  export type SolidParameters<
    config extends Config = Config,
    chainId extends
      config['chains'][number]['id'] = config['chains'][number]['id'],
    selectData = GetTransactionData<config, chainId>,
  > = Compute<
    GetTransactionOptions<config, chainId, selectData> & ConfigParameter<config>
  >
}
