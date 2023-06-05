import {
  type UseMutationOptions,
  type UseMutationResult,
  useMutation,
} from '@tanstack/react-query'
import {
  type Connector,
  type OmittedMutationOptions,
  type SwitchAccountError,
  type SwitchAccountMutationData,
  type SwitchAccountMutationParameters,
  type SwitchAccountMutationVariables,
  switchAccountMutationOptions,
} from '@wagmi/core'
import type { Pretty } from '@wagmi/core/internal'

import type { OmittedUseMutationResult } from '../types/query.js'
import { useConfig } from './useConfig.js'
import { useConnections } from './useConnections.js'

export type UseSwitchAccountParameters<TContext = unknown> = Pretty<
  SwitchAccountMutationParameters & {
    mutation?: Omit<Options<TContext>, OmittedMutationOptions>
  }
>
type Options<TContext = unknown> = UseMutationOptions<
  SwitchAccountMutationData,
  SwitchAccountError,
  SwitchAccountMutationVariables,
  TContext
>

export type UseSwitchAccountReturnType<TContext = unknown> = Pretty<
  Omit<Result<TContext>, OmittedUseMutationResult> & {
    connectors: readonly Connector[]
    switchAccount: Result<TContext>['mutate']
    switchAccountAsync: Result<TContext>['mutateAsync']
  }
>
type Result<TContext = unknown> = UseMutationResult<
  SwitchAccountMutationData,
  SwitchAccountError,
  SwitchAccountMutationVariables,
  TContext
>

/** https://wagmi.sh/react/hooks/useSwitchAccount */
export function useSwitchAccount<TContext = unknown>({
  connector,
  mutation,
}: UseSwitchAccountParameters<TContext> = {}): UseSwitchAccountReturnType<TContext> {
  const config = useConfig()
  const { mutate, mutateAsync, ...mutationOptions } = useMutation<
    SwitchAccountMutationData,
    SwitchAccountError,
    SwitchAccountMutationVariables,
    TContext
  >(switchAccountMutationOptions(config, { connector }))
  const connections = useConnections()
  const connectors = connections.map((connection) => connection.connector)

  return {
    ...mutationOptions,
    ...mutation,
    connectors,
    switchAccount: mutate,
    switchAccountAsync: mutateAsync,
  }
}
