import {
  type UseMutationOptions,
  type UseMutationResult,
  useMutation,
} from '@tanstack/react-query'
import {
  type ConnectMutationData,
  type ConnectMutationError,
  type ConnectMutationVariables,
  type Connector,
  type Prettify,
  connectMutationOptions,
} from '@wagmi/core'

import { useConfig } from './useConfig.js'

export type UseConnectParameters = Prettify<
  Omit<Options, 'mutationFn' | 'mutationKey'> & ConnectMutationVariables
>
type Options = UseMutationOptions<
  ConnectMutationData,
  ConnectMutationError,
  ConnectMutationVariables
>
export type UseConnectReturnType = Prettify<
  Omit<Result, 'mutate' | 'mutateAsync'> & {
    connect: Result['mutate']
    connectAsync: Result['mutateAsync']
    connectors: readonly Connector[]
  }
>
type Result = UseMutationResult<
  ConnectMutationData,
  ConnectMutationError,
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
