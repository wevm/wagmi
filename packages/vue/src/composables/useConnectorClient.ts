import { useQueryClient } from '@tanstack/vue-query'
import type {
  Config,
  Connector,
  GetConnectorClientErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { Compute, Omit } from '@wagmi/core/internal'
import {
  type GetConnectorClientData,
  type GetConnectorClientOptions,
  type GetConnectorClientQueryFnData,
  type GetConnectorClientQueryKey,
  getConnectorClientQueryOptions,
} from '@wagmi/core/query'
import { computed, ref, watchEffect } from 'vue'

import type { ConfigParameter } from '../types/properties.js'
import type { DeepMaybeRef, DeepUnwrapRef } from '../types/ref.js'
import { deepUnref } from '../utils/cloneDeep.js'
import {
  type UseQueryParameters,
  type UseQueryReturnType,
  useQuery,
} from '../utils/query.js'
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
    GetConnectorClientOptions<config, chainId> &
      ConfigParameter<config> & {
        query?:
          | Compute<
              Omit<
                DeepUnwrapRef<
                  UseQueryParameters<
                    GetConnectorClientQueryFnData<config, chainId>,
                    GetConnectorClientErrorType,
                    selectData,
                    GetConnectorClientQueryKey<config, chainId>
                  >
                >,
                'gcTime' | 'staleTime'
              >
            >
          | undefined
      }
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
  parameters_: UseConnectorClientParameters<config, chainId, selectData> = {},
): UseConnectorClientReturnType<config, chainId, selectData> {
  const parameters = computed(() => deepUnref(parameters_))

  const config = useConfig(parameters)
  const queryClient = useQueryClient()
  const { address, connector } = useConnection({ config })
  const chainId = useChainId({ config })

  const options = computed(() => {
    const { query = {} } = parameters.value
    const options = getConnectorClientQueryOptions<config, chainId>(
      config as config,
      {
        ...deepUnref(parameters),
        chainId: (parameters.chainId ?? chainId.value) as chainId,
        connector: (parameters.value.connector ?? connector.value) as Connector,
      },
    )
    return {
      ...query,
      ...options,
      enabled: Boolean(options.enabled && (query.enabled ?? true)),
      staleTime: Number.POSITIVE_INFINITY,
    }
  })

  const addressRef = ref(address)
  watchEffect(() => {
    const previousAddress = addressRef.value
    if (!address && previousAddress) {
      // remove when account is disconnected
      queryClient.removeQueries({ queryKey: options.value.queryKey })
      addressRef.value = undefined
    } else if (address.value !== previousAddress) {
      // invalidate when address changes
      queryClient.invalidateQueries({ queryKey: options.value.queryKey })
      addressRef.value = address.value
    }
  })
  return useQuery(options as any) as UseConnectorClientReturnType<
    config,
    chainId,
    selectData
  >
}
