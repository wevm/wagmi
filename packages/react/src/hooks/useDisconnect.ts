import {
  type UseMutationOptions,
  type UseMutationResult,
  useMutation,
} from '@tanstack/react-query'
import {
  type Connector,
  type DisconnectError,
  type DisconnectMutationData,
  type DisconnectMutationParameters,
  type DisconnectMutationVariables,
  type OmittedMutationOptions,
  disconnectMutationOptions,
} from '@wagmi/core'
import type { Pretty } from '@wagmi/core/internal'

import type { OmittedUseMutationResult } from '../types/query.js'
import { useConfig } from './useConfig.js'

export type UseDisconnectParameters = Pretty<
  DisconnectMutationParameters & {
    mutation?: Omit<Options, OmittedMutationOptions>
  }
>
type Options = UseMutationOptions<
  DisconnectMutationData,
  DisconnectError,
  DisconnectMutationVariables
>

export type UseDisconnectReturnType = Pretty<
  Omit<Result, OmittedUseMutationResult> & {
    connectors: readonly Connector[]
    disconnect: Result['mutate']
    disconnectAsync: Result['mutateAsync']
  }
>
type Result = UseMutationResult<
  DisconnectMutationData,
  DisconnectError,
  DisconnectMutationVariables
>

export function useDisconnect({
  connector,
  mutation,
}: UseDisconnectParameters = {}): UseDisconnectReturnType {
  const config = useConfig()
  const { mutate, mutateAsync, ...mutationOptions } = useMutation(
    disconnectMutationOptions(config, { connector }),
  )
  return {
    ...mutationOptions,
    ...mutation,
    connectors: config.connectors.filter((x) =>
      config.state.connections.has(x.uid),
    ),
    disconnect: mutate,
    disconnectAsync: mutateAsync,
  }
}
