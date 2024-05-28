import type {
  Config,
  GetTransactionReceiptErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'
import {
  type GetTransactionReceiptData,
  type GetTransactionReceiptOptions,
  type GetTransactionReceiptQueryKey,
  getTransactionReceiptQueryOptions,
} from '@wagmi/core/query'
import type { GetTransactionReceiptQueryFnData } from '@wagmi/core/query'

import { computed } from 'vue'
import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import type { DeepMaybeRef } from '../types/ref.js'
import { deepUnref } from '../utils/cloneDeep.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseTransactionReceiptParameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetTransactionReceiptData<config, chainId>,
> = Evaluate<
  DeepMaybeRef<
    GetTransactionReceiptOptions<config, chainId> &
      ConfigParameter<config> &
      QueryParameter<
        GetTransactionReceiptQueryFnData<config, chainId>,
        GetTransactionReceiptErrorType,
        selectData,
        GetTransactionReceiptQueryKey<config, chainId>
      >
  >
>

export type UseTransactionReceiptReturnType<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetTransactionReceiptData<config, chainId>,
> = UseQueryReturnType<selectData, GetTransactionReceiptErrorType>

/** https://wagmi.sh/vue/api/composables/useTransactionReceipt */
export function useTransactionReceipt<
  config extends Config = ResolvedRegister['config'],
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetTransactionReceiptData<config, chainId>,
>(
  parameters_: UseTransactionReceiptParameters<
    config,
    chainId,
    selectData
  > = {},
): UseTransactionReceiptReturnType<config, chainId, selectData> {
  const parameters = computed(() => deepUnref(parameters_))

  const config = useConfig(parameters)
  const configChainId = useChainId({ config })

  const queryOptions = computed(() => {
    const { chainId = configChainId.value, hash, query = {} } = parameters.value
    const options = getTransactionReceiptQueryOptions(config, {
      ...parameters.value,
      chainId,
    })
    const enabled = Boolean(hash && (query.enabled ?? true))
    return {
      ...(query as any),
      ...options,
      enabled,
    }
  })

  return useQuery(queryOptions) as UseTransactionReceiptReturnType<
    config,
    chainId,
    selectData
  >
}
