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

export type UseConnectParameters = Pretty<
  ConnectMutationParameters & {
    mutation?: Omit<MutationOptions, OmittedMutationOptions>
  }
>
type MutationOptions = UseMutationOptions<
  ConnectMutationData,
  ConnectError,
  ConnectMutationVariables
>

export type UseConnectReturnType = Pretty<
  Omit<Result, OmittedUseMutationResult> & {
    connect: Result['mutate']
    connectAsync: Result['mutateAsync']
    connectors: readonly Connector[]
  }
>
type Result = UseMutationResult<
  ConnectMutationData,
  ConnectError,
  ConnectMutationVariables
>

/** https://wagmi.sh/react/hooks/useConnect */
export function useConnect({
  chainId,
  connector,
  mutation,
}: UseConnectParameters = {}): UseConnectReturnType {
  const config = useConfig()
  const { mutate, mutateAsync, ...mutationOptions } = useMutation(
    connectMutationOptions(config, { chainId, connector }),
  )
  return {
    ...mutationOptions,
    ...mutation,
    connect: mutate,
    connectAsync: mutateAsync,
    connectors: config.connectors,
  }
}
