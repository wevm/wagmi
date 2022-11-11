import type { ConnectArgs, ConnectResult } from '@wagmi/core'
import { connect } from '@wagmi/core'
import * as React from 'react'

import { useClient } from '../../context'
import type { MutationConfig } from '../../types'
import { useMutation } from '../utils'

export type UseConnectArgs = Partial<ConnectArgs>

export type UseConnectConfig = MutationConfig<ConnectResult, Error, ConnectArgs>

export const mutationKey = (args: UseConnectArgs) =>
  [{ entity: 'connect', ...args }] as const

const mutationFn = (args: UseConnectArgs) => {
  const { connector, chainId } = args
  if (!connector) throw new Error('connector is required')
  return connect({ connector, chainId })
}

export function useConnect({
  chainId,
  connector,
  onError,
  onMutate,
  onSettled,
  onSuccess,
}: UseConnectArgs & UseConnectConfig = {}) {
  const client = useClient()

  const {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    mutate,
    mutateAsync,
    reset,
    status,
    variables,
  } = useMutation(mutationKey({ connector, chainId }), mutationFn, {
    onError,
    onMutate,
    onSettled,
    onSuccess,
  })

  const connect = React.useCallback(
    (args?: Partial<ConnectArgs>) => {
      return mutate({
        chainId: args?.chainId ?? chainId,
        connector: args?.connector ?? connector,
      } as ConnectArgs)
    },
    [chainId, connector, mutate],
  )

  const connectAsync = React.useCallback(
    (args?: Partial<ConnectArgs>) => {
      return mutateAsync({
        chainId: args?.chainId ?? chainId,
        connector: args?.connector ?? connector,
      } as ConnectArgs)
    },
    [chainId, connector, mutateAsync],
  )

  return {
    connect,
    connectAsync,
    connectors: client.connectors,
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    pendingConnector: variables?.connector,
    reset,
    status,
    variables,
  } as const
}
