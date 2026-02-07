import type {
  Config,
  GetTransactionReceiptErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { Compute, ConfigParameter } from '@wagmi/core/internal'
import {
  type GetTransactionReceiptData,
  type GetTransactionReceiptOptions,
  getTransactionReceiptQueryOptions,
} from '@wagmi/core/query'
import { type Accessor, createMemo } from 'solid-js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

/** https://wagmi.sh/solid/api/primitives/useTransactionReceipt */
export function useTransactionReceipt<
  config extends Config = ResolvedRegister['config'],
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetTransactionReceiptData<config, chainId>,
>(
  parameters: useTransactionReceipt.Parameters<
    config,
    chainId,
    selectData
  > = () => ({}),
): useTransactionReceipt.ReturnType<config, chainId, selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId(() => ({ config: config() }))
  const options = createMemo(() =>
    getTransactionReceiptQueryOptions(config(), {
      ...parameters(),
      chainId: parameters().chainId ?? chainId(),
    }),
  )
  return useQuery(options) as useTransactionReceipt.ReturnType<
    config,
    chainId,
    selectData
  >
}

export namespace useTransactionReceipt {
  export type Parameters<
    config extends Config = Config,
    chainId extends
      config['chains'][number]['id'] = config['chains'][number]['id'],
    selectData = GetTransactionReceiptData<config, chainId>,
  > = Accessor<SolidParameters<config, chainId, selectData>>

  export type ReturnType<
    config extends Config = Config,
    chainId extends
      config['chains'][number]['id'] = config['chains'][number]['id'],
    selectData = GetTransactionReceiptData<config, chainId>,
  > = UseQueryReturnType<selectData, GetTransactionReceiptErrorType>

  export type SolidParameters<
    config extends Config = Config,
    chainId extends
      config['chains'][number]['id'] = config['chains'][number]['id'],
    selectData = GetTransactionReceiptData<config, chainId>,
  > = Compute<
    GetTransactionReceiptOptions<config, chainId, selectData> &
      ConfigParameter<config>
  >
}
