import {
  type Config,
  type GetClientParameters,
  type GetClientReturnType,
  type ResolvedRegister,
  getClient,
  watchClient,
} from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'
import {
  type Ref,
  computed,
  onScopeDispose,
  readonly,
  ref,
  watchEffect,
} from 'vue'

import type { ConfigParameter } from '../types/properties.js'
import type { DeepMaybeRef } from '../types/ref.js'
import { cloneDeepUnref } from '../utils/cloneDeep.js'
import { useConfig } from './useConfig.js'

export type UseClientParameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | number | undefined =
    | config['chains'][number]['id']
    | undefined,
> = Evaluate<
  DeepMaybeRef<GetClientParameters<config, chainId> & ConfigParameter<config>>
>

export type UseClientReturnType<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | number | undefined =
    | config['chains'][number]['id']
    | undefined,
> = Ref<GetClientReturnType<config, chainId>>

/** https://wagmi.sh/react/api/hooks/useClient */
export function useClient<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] | number | undefined =
    | config['chains'][number]['id']
    | undefined,
>(
  parameters_: UseClientParameters<config, chainId> = {},
): UseClientReturnType<config, chainId> {
  const parameters = computed(() => cloneDeepUnref(parameters_))

  const config = useConfig(parameters)

  const client = ref(
    getClient(
      config,
      parameters.value as GetClientParameters,
    ) as GetClientReturnType,
  )

  watchEffect(() => {
    client.value = getClient(config, parameters.value as GetClientParameters)
  })

  const unsubscribe = watchClient(config, {
    onChange(data) {
      if (client.value?.uid === data?.uid) return
      client.value = data
    },
  })
  onScopeDispose(() => unsubscribe())

  return readonly(client) as UseClientReturnType<config, chainId>
}
