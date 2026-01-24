import type { Config, ConnectErrorType } from '@wagmi/core'
import type { Compute, ConfigParameter } from '@wagmi/core/internal'
import {
  type ConnectData,
  type ConnectMutate,
  type ConnectMutateAsync,
  type ConnectOptions,
  type ConnectVariables,
  connectMutationOptions,
} from '@wagmi/core/query'
import { type Accessor, createEffect, onCleanup } from 'solid-js'
import type { UseMutationReturnType } from '../utils/query.js'
import { useMutation } from '../utils/query.js'
import { useConfig } from './useConfig.js'

/** https://wagmi.sh/solid/api/hooks/useConnect */
export function useConnect<config extends Config = Config, context = unknown>(
  parameters: useConnect.Parameters<config, context> = () => ({}),
): useConnect.ReturnType<config, context> {
  const config = useConfig(parameters)
  const mutation = useMutation(() =>
    connectMutationOptions(config(), parameters()),
  )
  // Reset mutation back to an idle state when the connector disconnects.
  createEffect(() => {
    const unsubscribe = config().subscribe(
      ({ status }) => status,
      (status, previousStatus) => {
        if (previousStatus === 'connected' && status === 'disconnected') {
          mutation.reset()
        }
      },
    )
    onCleanup(() => unsubscribe())
  })
  return mutation as unknown as useConnect.ReturnType<config, context>
}

export namespace useConnect {
  export type Parameters<
    config extends Config = Config,
    context = unknown,
  > = Accessor<SolidParameters<config, context>>

  export type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = Compute<
    UseMutationReturnType<
      ConnectData<config, config['connectors'][number], boolean>,
      ConnectErrorType,
      ConnectVariables<config, config['connectors'][number], boolean>,
      context,
      ConnectMutate<config, context>,
      ConnectMutateAsync<config, context>
    >
  >

  export type SolidParameters<
    config extends Config = Config,
    context = unknown,
  > = Compute<ConfigParameter<config> & ConnectOptions<config, context>>
}
