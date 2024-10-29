import type {
  CreateMutationParameters,
  CreateMutationReturnType,
} from '$lib/query.svelte.js'
import type {
  ConfigParameter,
  RuneParameters,
  RuneReturnType,
} from '$lib/types.js'
import {
  type CreateMutationResult,
  createMutation,
} from '@tanstack/svelte-query'
import type { Config, ConnectErrorType, ResolvedRegister } from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type ConnectData,
  type ConnectMutate,
  type ConnectMutateAsync,
  type ConnectVariables,
  connectMutationOptions,
} from '@wagmi/core/query'
import { useConfig } from './useConfig.svelte.js'
import {
  type UseConnectorsReturnType,
  useConnectors,
} from './useConnectors.svelte.js'

export type UseConnectParameters<
  config extends Config = Config,
  context = unknown,
> = RuneParameters<
  Compute<
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
>

export type UseConnectReturnType<
  config extends Config = Config,
  context = unknown,
> = RuneReturnType<
  Compute<
    CreateMutationReturnType<
      ConnectData<config>,
      ConnectErrorType,
      ConnectVariables<config>,
      context
    > & {
      connect: ConnectMutate<config, context>
      connectAsync: ConnectMutateAsync<config, context>
      connectors: Compute<ReturnType<UseConnectorsReturnType>>
    }
  >
>

/** https://wagmi.sh/react/api/hooks/useConnect */
export function useConnect<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: UseConnectParameters<config, context> = () => ({}),
): UseConnectReturnType<config, context> {
  const { mutation } = $derived.by(parameters)

  const config = $derived.by(useConfig(parameters))

  const mutationOptions = $derived(connectMutationOptions(config))
  const { mutate, mutateAsync, ...result } = $derived(
    createMutation(() => ({
      ...mutation,
      ...mutationOptions,
    })),
  )

  // Reset mutation back to an idle state when the connector disconnects.
  $effect(() => {
    ;[
      // deps
      config,
      result.reset,
    ]
    return config.subscribe(
      ({ status }) => status,
      (status, previousStatus) => {
        if (previousStatus === 'connected' && status === 'disconnected')
          result.reset()
      },
    )
  })

  const connectors = $derived.by(useConnectors(() => ({ config })))

  return () => ({
    ...result,
    connect: mutate,
    connectAsync: mutateAsync,
    connectors,
  })
}
