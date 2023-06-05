import {
  type UseMutationOptions,
  type UseMutationResult,
  useMutation,
} from '@tanstack/react-query'
import {
  type ConnectError,
  type ConnectMutationData,
  type ConnectMutationParameters,
  type ConnectMutationVariables,
  type Connector,
  type OmittedMutationOptions,
  connectMutationOptions,
} from '@wagmi/core'
import type { Pretty } from '@wagmi/core/internal'

import type { OmittedUseMutationResult } from '../types/query.js'
import { useConfig } from './useConfig.js'

export type UseConnectParameters<TContext = unknown> = Pretty<
  ConnectMutationParameters & {
    mutation?: Omit<MutationOptions<TContext>, OmittedMutationOptions>
  }
>
type MutationOptions<TContext = unknown> = UseMutationOptions<
  ConnectMutationData,
  ConnectError,
  ConnectMutationVariables,
  TContext
>

export type UseConnectReturnType<TContext = unknown> = Pretty<
  Omit<Result<TContext>, OmittedUseMutationResult> & {
    connect: Result<TContext>['mutate']
    connectAsync: Result<TContext>['mutateAsync']
    connectors: readonly Connector[]
  }
>
type Result<TContext = unknown> = UseMutationResult<
  ConnectMutationData,
  ConnectError,
  ConnectMutationVariables,
  TContext
>

/** https://wagmi.sh/react/hooks/useConnect */
export function useConnect<TContext = unknown>({
  chainId,
  connector,
  mutation,
}: UseConnectParameters<TContext> = {}): UseConnectReturnType<TContext> {
  const config = useConfig()
  const { mutate, mutateAsync, ...mutationOptions } = useMutation<
    ConnectMutationData,
    ConnectError,
    ConnectMutationVariables,
    TContext
  >(connectMutationOptions(config, { chainId, connector }))
  return {
    ...mutationOptions,
    ...mutation,
    connect: mutate,
    connectAsync: mutateAsync,
    connectors: config.connectors,
  }
}
