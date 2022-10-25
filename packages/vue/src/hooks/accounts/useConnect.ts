import { UseMutationOptions, useMutation } from '@tanstack/vue-query'
import { ConnectArgs, ConnectResult, Connector, connect } from '@wagmi/core'

import { computed, unref } from 'vue-demi'

import { useClient } from '../../client'
import { MaybeRef } from '../../types'

export type UseConnectArgs = Partial<{
  [Property in keyof ConnectArgs]: MaybeRef<ConnectArgs[Property]>
}>

export type UseConnectConfig = UseMutationOptions<
  ConnectResult,
  Error,
  ConnectArgs,
  undefined
>

export const mutationKey = (args: UseConnectArgs) =>
  [{ entity: 'connect', ...args }] as const

const mutationFn = (args: UseConnectArgs) => {
  const { connector, chainId } = args
  if (!connector) throw new Error('connector is required')
  return connect({
    connector: unref<Connector>(connector),
    chainId: unref<number | undefined>(chainId),
  })
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
  } = useMutation(
    mutationKey({
      connector,
      chainId,
    }),
    mutationFn,
    {
      onError,
      onMutate,
      onSettled,
      onSuccess,
    },
  )

  const connect = (args?: Partial<ConnectArgs>) => {
    return mutate({
      chainId: args?.chainId ?? unref<number | undefined>(chainId),
      connector: args?.connector ?? unref<Connector | undefined>(connector),
    })
  }

  const connectAsync = (args?: Partial<ConnectArgs>) => {
    return mutateAsync({
      chainId: args?.chainId ?? unref<number | undefined>(chainId),
      connector: args?.connector ?? unref<Connector | undefined>(connector),
    })
  }

  return {
    connect,
    connectAsync,
    connectors: client.value.connectors,
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    pendingConnector: computed(() => variables.value?.connector),
    reset,
    status,
    variables,
  } as const
}
