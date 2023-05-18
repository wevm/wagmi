import {
  type UseMutationOptions,
  type UseMutationResult,
  useMutation,
} from '@tanstack/react-query'
import {
  type ConnectError,
  type ConnectMutationData,
  type ConnectMutationVariables,
  type Connector,
  type OmittedMutationOptions,
  connectMutationOptions,
} from '@wagmi/core'
import type { Prettify } from '@wagmi/core/internal'

import type { OmittedUseMutationResult } from '../types/query.js'
import { useConfig } from './useConfig.js'

export type UseConnectParameters = Prettify<
  Omit<Options, OmittedMutationOptions> & ConnectMutationVariables
>
type Options = UseMutationOptions<
  ConnectMutationData,
  ConnectError,
  ConnectMutationVariables
>

export type UseConnectReturnType = Prettify<
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

export function useConnect(
  parameters: UseConnectParameters = {},
): UseConnectReturnType {
  const config = useConfig()
  const { mutate, mutateAsync, ...rest } = useMutation(
    connectMutationOptions(config, parameters),
  )
  return {
    ...rest,
    connect: mutate,
    connectAsync: mutateAsync,
    connectors: config.connectors,
  }
}
