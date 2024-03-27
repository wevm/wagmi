'use client'

import { createMutation } from '@tanstack/solid-query'
import { type Connector, type DisconnectErrorType } from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'
import {
  type DisconnectData,
  type DisconnectMutate,
  type DisconnectMutateAsync,
  type DisconnectVariables,
  disconnectMutationOptions,
} from '@wagmi/core/query'

import type { ConfigParameter } from '../types/properties.js'
import type {
  CreateMutationParameters,
  CreateMutationReturnType,
} from '../utils/query.js'
import { createConfig } from './createConfig.js'
import { createConnections } from './createConnections.js'
import { FunctionedParams } from '@tanstack/solid-query'

export type CreateDisconnectParameters<context = unknown> = FunctionedParams<Evaluate<
  ConfigParameter & {
    mutation?:
      | ReturnType<CreateMutationParameters<
          DisconnectData,
          DisconnectErrorType,
          DisconnectVariables,
          context
        >>
      | undefined
  }
>>

export type CreateDisconnectReturnType<context = unknown> = Evaluate<
  { mutation: CreateMutationReturnType<
    DisconnectData,
    DisconnectErrorType,
    DisconnectVariables,
    context
  > } & {
    connectors: readonly Connector[]
    disconnect: DisconnectMutate<context>
    disconnectAsync: DisconnectMutateAsync<context>
  }
>

/** https://wagmi.sh/react/api/hooks/useDisconnect */
export function createDisconnect<context = unknown>(
  parameters: CreateDisconnectParameters<context> = ()=>({}),
): CreateDisconnectReturnType<context> {
  const { mutation: mutationParam } = parameters()

  const { config: _config } = createConfig(parameters)

  const mutationOptions = disconnectMutationOptions(_config)
  const mutation = createMutation(()=>({
    ...mutationParam,
    ...mutationOptions,
  }))

  return {
    mutation,
    connectors: createConnections().connections.map((connection) => connection.connector),
    disconnect: mutation.mutate,
    disconnectAsync: mutation.mutateAsync,
  }
}
