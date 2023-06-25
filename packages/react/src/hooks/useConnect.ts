import { useMutation } from '@tanstack/react-query'
import {
  type ConnectError,
  type ConnectMutate,
  type ConnectMutateAsync,
  type ConnectMutationOptions,
  type ConnectParameters,
  type ConnectReturnType,
  type Connector,
  type CreateConnectorFn,
  type ResolvedRegister,
  connectMutationOptions,
} from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'
import * as React from 'react'

import type { UseMutationOptions, UseMutationResult } from '../types/query.js'
import { useConfig } from './useConfig.js'

export type UseConnectParameters<
  connector extends CreateConnectorFn | Connector | undefined = undefined,
  context = unknown,
> = Evaluate<
  ConnectMutationOptions<ResolvedRegister['config'], connector> & {
    mutation?: UseMutationOptions<
      ConnectReturnType<ResolvedRegister['config']>,
      ConnectError,
      ConnectParameters<ResolvedRegister['config']>,
      context
    >
  }
>

export type UseConnectReturnType<
  connector extends CreateConnectorFn | Connector | undefined = undefined,
  context = unknown,
> = Evaluate<
  UseMutationResult<
    ConnectReturnType<ResolvedRegister['config']>,
    ConnectError,
    ConnectParameters<ResolvedRegister['config']>,
    context
  > & {
    connect: ConnectMutate<ResolvedRegister['config'], connector, context>
    connectAsync: ConnectMutateAsync<
      ResolvedRegister['config'],
      connector,
      context
    >
    connectors: ResolvedRegister['config']['connectors']
  }
>

export function useConnect<
  connector extends Connector | CreateConnectorFn | undefined = undefined,
  context = unknown,
>(
  parameters?: UseConnectParameters<connector, context>,
): UseConnectReturnType<connector, context>

/** https://wagmi.sh/react/hooks/useConnect */
export function useConnect(
  parameters: UseConnectParameters = {},
): UseConnectReturnType {
  const config = useConfig()
  const { getVariables, ...mutationOptions } = connectMutationOptions(
    config,
    parameters,
  )
  const { mutate, mutateAsync, ...result } = useMutation(mutationOptions)
  return {
    ...result,
    ...parameters.mutation,
    connect: React.useCallback(
      (variables, options) => mutate(getVariables(variables), options),
      [getVariables, mutate],
    ),
    connectAsync: React.useCallback(
      (variables, options) => mutateAsync(getVariables(variables), options),
      [getVariables, mutateAsync],
    ),
    connectors: config.connectors,
  }
}
