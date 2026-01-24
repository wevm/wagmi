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
import { computed } from 'vue'
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
> = Compute<
  DeepMaybeRef<
    GetTransactionOptions<config, chainId, selectData> & ConfigParameter<config>
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
  parameters: UseTransactionParameters<config, chainId, selectData> = {},
): UseTransactionReturnType<config, chainId, selectData> {
  const params = computed(() => deepUnref(parameters))
  const config = useConfig(params)
  const chainId = useChainId({ config })
  const options = computed(() =>
    getTransactionQueryOptions(config as any, {
      ...(params.value as any),
      chainId: params.value.chainId ?? chainId.value,
    }),
  )
  return useQuery(options as any) as any
}
