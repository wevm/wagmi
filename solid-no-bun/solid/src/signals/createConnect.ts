import { FunctionedParams, createMutation } from '@tanstack/solid-query'
import {
  type Config,
  type ConnectErrorType,
  type Connector,
  type ResolvedRegister,
} from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'
import {
  type ConnectData,
  type ConnectVariables,
  type ConnectMutate,
  type ConnectMutateAsync,
  connectMutationOptions,
} from '@wagmi/core/query'

import type { ConfigParameter } from '../types/properties.ts'
import type {
  CreateMutationParameters,
  CreateMutationReturnType,
} from '../utils/query.ts'
import { createConnectors } from './createConnectors.ts'
import { createConfig } from './createConfig.ts'
import { createEffect } from 'solid-js/types/server/reactive.js'

export type CreateConnectParameters<
  config extends Config = Config,
  context = unknown,
> = FunctionedParams<Evaluate<
  ConfigParameter<config> & {
    mutation?:
      | ReturnType<CreateMutationParameters<
          ConnectData<config>,
          ConnectErrorType,
          ConnectVariables<config>,
          context
        >>
      | undefined
  }
>>

export type CreateConnectReturnType<
  config extends Config = Config,
  context = unknown,
> = {  
    mutation: CreateMutationReturnType<
      ConnectData<config>,
      ConnectErrorType,
      ConnectVariables<config>,
      context>
    connect: ConnectMutate<config, context>
    connectAsync: ConnectMutateAsync<config, context>
    connectors: readonly Connector[]
  }

/** https://wagmi.sh/react/api/hooks/useConnect */
export function createConnect<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: CreateConnectParameters<config, context> = ()=>({}),
): CreateConnectReturnType<config, context> {
  const { mutation: mutationParam } = parameters()

  const config = createConfig(parameters)
  const { connectors } = createConnectors(parameters)

  const mutationOptions = connectMutationOptions(config)

  const mutation = createMutation(()=>({
    ...mutationParam,
    ...mutationOptions
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

  return {
    mutation,
    connect: mutation.mutate,
    connectAsync: mutation.mutateAsync,
    connectors,
  }
}
