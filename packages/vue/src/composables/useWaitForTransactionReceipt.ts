import type {
  Config,
  ResolvedRegister,
  WaitForTransactionReceiptErrorType,
} from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'
import {
  type WaitForTransactionReceiptData,
  type WaitForTransactionReceiptOptions,
  type WaitForTransactionReceiptQueryFnData,
  type WaitForTransactionReceiptQueryKey,
  waitForTransactionReceiptQueryOptions,
} from '@wagmi/core/query'
import { computed } from 'vue'

import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import type { DeepMaybeRef } from '../types/ref.js'
import { deepUnref } from '../utils/cloneDeep.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseWaitForTransactionReceiptParameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = WaitForTransactionReceiptData<config, chainId>,
> = Evaluate<
  DeepMaybeRef<
    WaitForTransactionReceiptOptions<config, chainId> &
      ConfigParameter<config> &
      QueryParameter<
        WaitForTransactionReceiptQueryFnData<config, chainId>,
        WaitForTransactionReceiptErrorType,
        selectData,
        WaitForTransactionReceiptQueryKey<config, chainId>
      >
  >
>

export type UseWaitForTransactionReceiptReturnType<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = WaitForTransactionReceiptData<config, chainId>,
> = UseQueryReturnType<selectData, WaitForTransactionReceiptErrorType>

/** https://wagmi.sh/vue/api/composables/useWaitForTransactionReceipt */
export function useWaitForTransactionReceipt<
  config extends Config = ResolvedRegister['config'],
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = WaitForTransactionReceiptData<config, chainId>,
>(
  parameters_: UseWaitForTransactionReceiptParameters<
    config,
    chainId,
    selectData
  > = {},
): UseWaitForTransactionReceiptReturnType<config, chainId, selectData> {
  const parameters = computed(() => deepUnref(parameters_))
  const config = useConfig(parameters_)
  const configChainId = useChainId()

  const queryOptions = computed(() => {
    const { chainId = configChainId.value, hash, query = {} } = parameters.value

    const options = waitForTransactionReceiptQueryOptions(config, {
      ...parameters.value,
      chainId,
    })
    const enabled = Boolean(hash && (query.enabled ?? true))

    return {
      ...query,
      ...options,
      enabled,
    }
  })

  return useQuery(
    queryOptions as any,
  ) as UseWaitForTransactionReceiptReturnType<config, chainId, selectData>
}
