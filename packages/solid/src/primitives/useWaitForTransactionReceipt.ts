import type {
  Config,
  ResolvedRegister,
  WaitForTransactionReceiptErrorType,
} from '@wagmi/core'
import type { Compute, ConfigParameter } from '@wagmi/core/internal'
import {
  type WaitForTransactionReceiptData,
  type WaitForTransactionReceiptOptions,
  waitForTransactionReceiptQueryOptions,
} from '@wagmi/core/query'
import { type Accessor, createMemo } from 'solid-js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

/** https://wagmi.sh/solid/api/primitives/useWaitForTransactionReceipt */
export function useWaitForTransactionReceipt<
  config extends Config = ResolvedRegister['config'],
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = WaitForTransactionReceiptData<config, chainId>,
>(
  parameters: useWaitForTransactionReceipt.Parameters<
    config,
    chainId,
    selectData
  > = () => ({}),
): useWaitForTransactionReceipt.ReturnType<config, chainId, selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId(() => ({ config: config() }))
  const options = createMemo(() =>
    waitForTransactionReceiptQueryOptions(config(), {
      ...parameters(),
      chainId: parameters().chainId ?? chainId(),
    }),
  )
  return useQuery(options) as useWaitForTransactionReceipt.ReturnType<
    config,
    chainId,
    selectData
  >
}

export namespace useWaitForTransactionReceipt {
  export type Parameters<
    config extends Config = Config,
    chainId extends
      config['chains'][number]['id'] = config['chains'][number]['id'],
    selectData = WaitForTransactionReceiptData<config, chainId>,
  > = Accessor<SolidParameters<config, chainId, selectData>>

  export type ReturnType<
    config extends Config = Config,
    chainId extends
      config['chains'][number]['id'] = config['chains'][number]['id'],
    selectData = WaitForTransactionReceiptData<config, chainId>,
  > = UseQueryReturnType<selectData, WaitForTransactionReceiptErrorType>

  export type SolidParameters<
    config extends Config = Config,
    chainId extends
      config['chains'][number]['id'] = config['chains'][number]['id'],
    selectData = WaitForTransactionReceiptData<config, chainId>,
  > = Compute<
    WaitForTransactionReceiptOptions<config, chainId, selectData> &
      ConfigParameter<config>
  >
}
