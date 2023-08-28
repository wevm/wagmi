import { useMutation } from '@tanstack/react-query'
import {
  type Config,
  type ConnectError,
  type ResolvedRegister,
} from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'
import {
  type ConnectData,
  type ConnectMutate,
  type ConnectMutateAsync,
  type ConnectVariables,
  connectMutationOptions,
} from '@wagmi/core/query'

import type { ConfigParameter } from '../types/properties.js'
import type { UseMutationOptions, UseMutationResult } from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseConnectParameters<
  config extends Config = Config,
  context = unknown,
> = Evaluate<
  UseMutationOptions<
    ConnectData<config>,
    ConnectError,
    ConnectVariables<config>,
    context
  > &
    ConfigParameter<config>
>

export type UseConnectReturnType<
  config extends Config = Config,
  context = unknown,
> = Evaluate<
  UseMutationResult<
    ConnectData<config>,
    ConnectError,
    ConnectVariables<config>,
    context
  > & {
    connect: ConnectMutate<config, context>
    connectAsync: ConnectMutateAsync<config, context>
    connectors: config['connectors']
  }
>

/** https://wagmi.sh/react/hooks/useConnect */
export function useConnect<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: UseConnectParameters<config, context> = {},
): UseConnectReturnType<config, context> {
  const config = parameters.config ?? useConfig()
  const mutationOptions = connectMutationOptions(config)
  const { mutate, mutateAsync, ...result } = useMutation({
    ...parameters,
    ...mutationOptions,
  })
  return {
    ...result,
    connect: mutate,
    connectAsync: mutateAsync,
    connectors: config.connectors,
  }
}
