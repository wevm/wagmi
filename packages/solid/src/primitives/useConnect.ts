import type { Config, ConnectErrorType } from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type ConnectData,
  type ConnectMutate,
  type ConnectMutateAsync,
  type ConnectVariables,
  connectMutationOptions,
} from '@wagmi/core/query'
import { type Accessor, createEffect, mergeProps, onCleanup } from 'solid-js'

import type { ConfigParameter } from '../types/properties.js'
import type {
  SolidMutationParameters,
  UseMutationReturnType,
} from '../utils/query.js'
import { useMutation } from '../utils/query.js'
import { useConfig } from './useConfig.js'
import { type UseConnectorsReturnType, useConnectors } from './useConnectors.js'

export type SolidConnectParameters<
  config extends Config = Config,
  context = unknown,
> = Compute<
  ConfigParameter<config> & {
    mutation?:
      | SolidMutationParameters<
          ConnectData<config, config['connectors'][number], boolean>,
          ConnectErrorType,
          ConnectVariables<config, config['connectors'][number], boolean>,
          context
        >
      | undefined
  }
>

export type UseConnectParameters<
  config extends Config = Config,
  context = unknown,
> = Accessor<SolidConnectParameters<config, context>>

export type UseConnectReturnType<
  config extends Config = Config,
  context = unknown,
> = Compute<
  UseMutationReturnType<
    ConnectData<config, config['connectors'][number], boolean>,
    ConnectErrorType,
    ConnectVariables<config, config['connectors'][number], boolean>,
    context
  > & {
    /** @deprecated use `mutate` instead */
    connect: ConnectMutate<config, context>
    /** @deprecated use `mutateAsync` instead */
    connectAsync: ConnectMutateAsync<config, context>
    /** @deprecated use `useConnectors` instead */
    connectors: Compute<UseConnectorsReturnType> | config['connectors']
    mutate: ConnectMutate<config, context>
    mutateAsync: ConnectMutateAsync<config, context>
  }
>

/** https://wagmi.sh/solid/api/hooks/useConnect */
export function useConnect<config extends Config = Config, context = unknown>(
  parameters: UseConnectParameters<config, context> = () => ({}),
): UseConnectReturnType<config, context> {
  const config = useConfig(parameters)
  const connectors = useConnectors(parameters)

  const mutation = useMutation(() => {
    const mutationOptions = connectMutationOptions(config())
    return {
      ...parameters().mutation,
      ...mutationOptions,
    } as typeof mutationOptions
  })

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

  type Return = UseConnectReturnType<config, context>
  return mergeProps(mutation, {
    connect: mutation.mutate,
    connectAsync: mutation.mutateAsync,
    connectors,
  }) as Return
}
