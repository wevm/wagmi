import { useMutation } from '@tanstack/react-query'
import type {
  Connector,
  ResolvedRegister,
  SwitchAccountError,
} from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'
import {
  type SwitchAccountData,
  type SwitchAccountMutate,
  type SwitchAccountMutateAsync,
  type SwitchAccountOptions,
  type SwitchAccountVariables,
  switchAccountMutationOptions,
} from '@wagmi/core/query'
import * as React from 'react'

import type { UseMutationOptions, UseMutationResult } from '../types/query.js'
import { useConfig } from './useConfig.js'
import { useConnections } from './useConnections.js'

export type UseSwitchAccountParameters<
  connector extends Connector | undefined = Connector | undefined,
  context = unknown,
> = Evaluate<
  SwitchAccountOptions<connector> &
    UseMutationOptions<
      SwitchAccountData<ResolvedRegister['config']>,
      SwitchAccountError,
      SwitchAccountVariables<undefined>,
      context
    >
>

export type UseSwitchAccountReturnType<
  connector extends Connector | undefined = Connector | undefined,
  context = unknown,
> = Evaluate<
  UseMutationResult<
    SwitchAccountData<ResolvedRegister['config']>,
    SwitchAccountError,
    SwitchAccountVariables<undefined>,
    context
  > & {
    connectors: readonly Connector[]
    switchAccount: SwitchAccountMutate<
      ResolvedRegister['config'],
      connector,
      context
    >
    switchAccountAsync: SwitchAccountMutateAsync<
      ResolvedRegister['config'],
      connector,
      context
    >
  }
>

export function useSwitchAccount<
  connector extends Connector | undefined = undefined,
  context = unknown,
>(
  parameters?: UseSwitchAccountParameters<connector, context>,
): UseSwitchAccountReturnType<connector, context>

/** https://wagmi.sh/react/hooks/useSwitchAccount */
export function useSwitchAccount(
  parameters: UseSwitchAccountParameters = {},
): UseSwitchAccountReturnType {
  const config = useConfig()
  const { getVariables, ...mutationOptions } = switchAccountMutationOptions(
    config,
    parameters,
  )
  const { mutate, mutateAsync, ...result } = useMutation({
    ...parameters,
    ...mutationOptions,
  })
  return {
    ...result,
    connectors: useConnections().map((connection) => connection.connector),
    switchAccount: React.useCallback(
      (variables, options) => mutate(getVariables(variables), options),
      [getVariables, mutate],
    ),
    switchAccountAsync: React.useCallback(
      (variables, options) => mutateAsync(getVariables(variables), options),
      [getVariables, mutateAsync],
    ),
  }
}
