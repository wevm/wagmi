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
  type CreateConnectorFn,
  type OmittedMutationOptions,
  connectMutationOptions,
} from '@wagmi/core'
import type { Pretty } from '@wagmi/core/internal'

import type { OmittedUseMutationResult } from '../types/query.js'
import { useConfig } from './useConfig.js'

export type UseConnectParameters<
  connector extends CreateConnectorFn | Connector | undefined,
  context = unknown,
> = Pretty<
  ConnectMutationParameters<connector> & {
    mutation?: Omit<MutationOptions<connector, context>, OmittedMutationOptions>
  }
>
type MutationOptions<
  connector extends CreateConnectorFn | Connector | undefined,
  context = unknown,
> = UseMutationOptions<
  ConnectMutationData,
  ConnectError,
  ConnectMutationVariables<connector>,
  context
>

export type UseConnectReturnType<
  connector extends CreateConnectorFn | Connector | undefined,
  context = unknown,
> = Pretty<
  Omit<Result<connector, context>, OmittedUseMutationResult> & {
    connect: Result<connector, context>['mutate']
    connectAsync: Result<connector, context>['mutateAsync']
    connectors: readonly Connector[]
  }
>
type Result<
  connector extends CreateConnectorFn | Connector | undefined,
  context = unknown,
> = UseMutationResult<
  ConnectMutationData,
  ConnectError,
  ConnectMutationVariables<connector>,
  context
>

/** https://wagmi.sh/react/hooks/useConnect */
export function useConnect<
  connector extends CreateConnectorFn | Connector | undefined = undefined,
  context = unknown,
>({
  chainId,
  connector,
  mutation,
}: UseConnectParameters<connector, context> = {}): UseConnectReturnType<
  connector,
  context
> {
  const config = useConfig()
  const { mutate, mutateAsync, ...mutationOptions } = useMutation<
    ConnectMutationData,
    ConnectError,
    ConnectMutationVariables<connector>,
    context
  >(
    connectMutationOptions(config, {
      chainId,
      connector: connector as Connector,
    }),
  )
  return {
    ...mutationOptions,
    ...mutation,
    connect: mutate,
    connectAsync: mutateAsync,
    connectors: config.connectors,
  }
}
