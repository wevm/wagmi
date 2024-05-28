import { useMutation } from '@tanstack/vue-query'
import type {
  Config,
  ConnectErrorType,
  GetConnectorsReturnType,
  ResolvedRegister,
} from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'
import {
  type ConnectData,
  type ConnectMutate,
  type ConnectMutateAsync,
  type ConnectVariables,
  connectMutationOptions,
} from '@wagmi/core/query'
import { onScopeDispose } from 'vue'

import type { ConfigParameter } from '../types/properties.js'
import type {
  UseMutationParameters,
  UseMutationReturnType,
} from '../utils/query.js'
import { useConfig } from './useConfig.js'
import { useConnectors } from './useConnectors.js'

export type UseConnectParameters<
  config extends Config = Config,
  context = unknown,
> = Evaluate<
  ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          ConnectData<config>,
          ConnectErrorType,
          ConnectVariables<config>,
          context
        >
      | undefined
  }
>

export type UseConnectReturnType<
  config extends Config = Config,
  context = unknown,
> = Evaluate<
  UseMutationReturnType<
    ConnectData<config>,
    ConnectErrorType,
    ConnectVariables<config>,
    context
  > & {
    connect: ConnectMutate<config, context>
    connectAsync: ConnectMutateAsync<config, context>
    connectors: Evaluate<GetConnectorsReturnType>
  }
>

/** https://wagmi.sh/vue/api/composables/useConnect */
export function useConnect<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: UseConnectParameters<config, context> = {},
): UseConnectReturnType<config, context> {
  const { mutation } = parameters

  const config = useConfig(parameters)

  const mutationOptions = connectMutationOptions(config)
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions,
  })

  // Reset mutation back to an idle state when the connector disconnects.
  const unsubscribe = config.subscribe(
    ({ status }) => status,
    (status, previousStatus) => {
      if (previousStatus === 'connected' && status === 'disconnected')
        result.reset()
    },
  )
  onScopeDispose(() => unsubscribe())

  return {
    ...result,
    connect: mutate,
    connectAsync: mutateAsync,
    connectors: useConnectors({ config }).value,
  }
}
