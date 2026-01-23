import { useQueryClient } from '@tanstack/vue-query'
import type {
  Config,
  Connector,
  GetConnectorClientErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type GetConnectorClientData,
  type GetConnectorClientOptions,
  getConnectorClientQueryOptions,
} from '@wagmi/core/query'
import { computed, ref, watchEffect } from 'vue'
import type { ConfigParameter } from '../types/properties.js'
import type { DeepMaybeRef } from '../types/ref.js'
import { deepUnref } from '../utils/cloneDeep.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'
import { useConnection } from './useConnection.js'

export type UseConnectorClientParameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetConnectorClientData<config, chainId>,
> = Compute<
  DeepMaybeRef<
    GetConnectorClientOptions<config, chainId, selectData> &
      ConfigParameter<config>
  >
>

export type UseConnectorClientReturnType<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetConnectorClientData<config, chainId>,
> = UseQueryReturnType<selectData, GetConnectorClientErrorType>

/** https://wagmi.sh/vue/api/composables/useConnectorClient */
export function useConnectorClient<
  config extends Config = ResolvedRegister['config'],
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetConnectorClientData<config, chainId>,
>(
  parameters: UseConnectorClientParameters<config, chainId, selectData> = {},
): UseConnectorClientReturnType<config, chainId, selectData> {
  const params = computed(() => deepUnref(parameters))
  const config = useConfig(params)
  const chainId = useChainId({ config })
  const { address, connector } = useConnection({ config })
  const options = computed(() =>
    getConnectorClientQueryOptions(config as any, {
      ...params.value,
      chainId: params.value.chainId ?? chainId.value,
      connector: (params.value.connector ?? connector.value) as Connector,
      query: params.value.query as any,
    }),
  )

  const addressRef = ref(address)
  const queryClient = useQueryClient()
  watchEffect(() => {
    const previousAddress = addressRef.value
    if (!address && previousAddress) {
      queryClient.removeQueries({ queryKey: options.value.queryKey })
      addressRef.value = undefined
    } else if (address.value !== previousAddress) {
      queryClient.invalidateQueries({ queryKey: options.value.queryKey })
      addressRef.value = address.value
    }
  })

  return useQuery(options as any) as any
}
