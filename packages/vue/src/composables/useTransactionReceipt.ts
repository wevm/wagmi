import type {
  Config,
  GetTransactionReceiptErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type GetTransactionReceiptData,
  type GetTransactionReceiptOptions,
  getTransactionReceiptQueryOptions,
} from '@wagmi/core/query'
import { computed } from 'vue'
import type { ConfigParameter } from '../types/properties.js'
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
> = Compute<
  DeepMaybeRef<
    GetTransactionReceiptOptions<config, chainId, selectData> &
      ConfigParameter<config>
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
  parameters: UseTransactionReceiptParameters<config, chainId, selectData> = {},
): UseTransactionReceiptReturnType<config, chainId, selectData> {
  const params = computed(() => deepUnref(parameters))
  const config = useConfig(params)
  const chainId = useChainId({ config })
  const options = computed(() =>
    getTransactionReceiptQueryOptions(config as any, {
      ...params.value,
      chainId: params.value.chainId ?? chainId.value,
      query: params.value.query as any,
    }),
  )
  return useQuery(options as any) as any
}
