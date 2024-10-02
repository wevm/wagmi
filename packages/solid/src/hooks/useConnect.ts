import type { Config, ConnectErrorType, ResolvedRegister } from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type ConnectData,
  type ConnectVariables,
  connectMutationOptions,
} from '@wagmi/core/query'

import { createEffect } from 'solid-js'
import type { ConfigParameter } from '../types/properties.js'
import {
  type CreateMutationParameters,
  type CreateMutationReturnType,
  createMutation,
} from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseConnectParameters<
  config extends Config = Config,
  context = unknown,
> = Compute<
  ConfigParameter<config> & {
    mutation?:
      | CreateMutationParameters<
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
> = CreateMutationReturnType<
  ConnectData<config>,
  ConnectErrorType,
  ConnectVariables<config>,
  context
>

export function useConnect<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: UseConnectParameters<config, context> = {},
): UseConnectReturnType<config, context> {
  const config = useConfig(parameters)

  const mutationOptions = connectMutationOptions(config)
  const mutation = createMutation(() => ({
    ...parameters.mutation,
    ...mutationOptions,
  }))

  // Reset mutation back to an idle state when the connector disconnects.
  createEffect(() => {
    return config.subscribe(
      ({ status }) => status,
      (status, previousStatus) => {
        if (previousStatus === 'connected' && status === 'disconnected')
          mutation.reset()
      },
    )
  })

  return mutation
}
