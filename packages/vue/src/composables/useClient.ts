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
  onScopeDispose,
  readonly,
  ref,
  toValue,
  watchEffect,
} from 'vue'

import type { ConfigParameter, MaybeRefBy } from '../types/properties.js'
import { useConfig } from './useConfig.js'

export type UseClientParameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | number | undefined =
    | config['chains'][number]['id']
    | undefined,
> = Evaluate<
  MaybeRefBy<GetClientParameters<config, chainId>, 'chainId'> &
    ConfigParameter<config>
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
  parameters: UseClientParameters<config, chainId> = {},
): UseClientReturnType<config, chainId> {
  const config = useConfig(parameters)

  const client = ref(
    getClient(config, {
      ...parameters,
      chainId: toValue(parameters.chainId),
    }) as GetClientReturnType,
  )

  // Watch for changes on `parameters.chainId` ref.
  watchEffect(() => {
    client.value = getClient(config, {
      ...parameters,
      chainId: toValue(parameters.chainId),
    })
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
