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

export type UseSwitchAccountParameters<context = unknown> = Pretty<
  SwitchAccountMutationParameters & {
    mutation?: Omit<Options<context>, OmittedMutationOptions>
  }
>
type Options<context = unknown> = UseMutationOptions<
  SwitchAccountMutationData,
  SwitchAccountError,
  SwitchAccountMutationVariables,
  context
>

export type UseSwitchAccountReturnType<context = unknown> = Pretty<
  Omit<Result<context>, OmittedUseMutationResult> & {
    connectors: readonly Connector[]
    switchAccount: Result<context>['mutate']
    switchAccountAsync: Result<context>['mutateAsync']
  }
>
type Result<context = unknown> = UseMutationResult<
  SwitchAccountMutationData,
  SwitchAccountError,
  SwitchAccountMutationVariables,
  context
>

/** https://wagmi.sh/react/hooks/useSwitchAccount */
export function useSwitchAccount<context = unknown>({
  connector,
  mutation,
}: UseSwitchAccountParameters<context> = {}): UseSwitchAccountReturnType<context> {
  const config = useConfig()
  const { mutate, mutateAsync, ...mutationOptions } = useMutation<
    SwitchAccountMutationData,
    SwitchAccountError,
    SwitchAccountMutationVariables,
    context
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
