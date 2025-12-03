'use client'

import { useMutation } from '@tanstack/react-query'
import type { Config, ConnectErrorType, ResolvedRegister } from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type ConnectData,
  type ConnectMutate,
  type ConnectMutateAsync,
  type ConnectVariables,
  connectMutationOptions,
} from '@wagmi/core/query'
import { useEffect } from 'react'

import type { ConfigParameter } from '../types/properties.js'
import type {
  UseMutationParameters,
  UseMutationReturnType,
} from '../utils/query.js'
import { useConfig } from './useConfig.js'
import { type UseConnectorsReturnType, useConnectors } from './useConnectors.js'

export type UseConnectParameters<
  config extends Config = Config,
  context = unknown,
> = Compute<
  ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          ConnectData<config, config['connectors'][number], boolean>,
          ConnectErrorType,
          ConnectVariables<config, config['connectors'][number], boolean>,
          context
        >
      | undefined
  }
>

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

/** https://wagmi.sh/react/api/hooks/useConnect */
export function useConnect<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: UseConnectParameters<config, context> = {},
): UseConnectReturnType<config, context> {
  const config = useConfig(parameters)

  const mutationOptions = connectMutationOptions(config)
  const mutation = useMutation({
    ...(parameters.mutation as typeof mutationOptions),
    ...mutationOptions,
  })

  // Reset mutation back to an idle state when the connector disconnects.
  useEffect(() => {
    return config.subscribe(
      ({ status }) => status,
      (status, previousStatus) => {
        if (previousStatus === 'connected' && status === 'disconnected')
          mutation.reset()
      },
    )
  }, [config, mutation.reset])

  type Return = UseConnectReturnType<config, context>
  return {
    ...(mutation as Return),
    connect: mutation.mutate as Return['mutate'],
    connectAsync: mutation.mutateAsync as Return['mutateAsync'],
    connectors: useConnectors({ config }),
  }
}
