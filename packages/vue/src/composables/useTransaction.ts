import type {
  Config,
  GetTransactionErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'
import {
  type GetTransactionData,
  type GetTransactionOptions,
  type GetTransactionQueryFnData,
  type GetTransactionQueryKey,
  getTransactionQueryOptions,
} from '@wagmi/core/query'

import { computed } from 'vue'
import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import type { DeepMaybeRef } from '../types/ref.js'
import { deepUnref } from '../utils/cloneDeep.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseTransactionParameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetTransactionData<config, chainId>,
> = Evaluate<
  DeepMaybeRef<
    GetTransactionOptions<config, chainId> &
      ConfigParameter<config> &
      QueryParameter<
        GetTransactionQueryFnData<config, chainId>,
        GetTransactionErrorType,
        selectData,
        GetTransactionQueryKey<config, chainId>
      >
  >
>

export type UseTransactionReturnType<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetTransactionData<config, chainId>,
> = UseQueryReturnType<selectData, GetTransactionErrorType>

/** https://wagmi.sh/vue/api/composables/useTransaction */
export function useTransaction<
  config extends Config = ResolvedRegister['config'],
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetTransactionData<config, chainId>,
>(
  parameters_: UseTransactionParameters<config, chainId, selectData> = {},
): UseTransactionReturnType<config, chainId, selectData> {
  const parameters = computed(() => deepUnref(parameters_))

  const config = useConfig(parameters)
  const configChainId = useChainId({ config })

  const queryOptions = computed(() => {
    const {
      blockHash,
      blockNumber,
      blockTag,
      chainId = configChainId.value,
      hash,
      query = {},
    } = parameters.value
    const options = getTransactionQueryOptions(config, {
      ...parameters.value,
      chainId,
    })
    const enabled = Boolean(
      !(blockHash && blockNumber && blockTag && hash) &&
        (query.enabled ?? true),
    )
    return {
      ...query,
      ...options,
      enabled,
    }
  })

  return useQuery(queryOptions as any) as UseTransactionReturnType<
    config,
    chainId,
    selectData
  >
}
