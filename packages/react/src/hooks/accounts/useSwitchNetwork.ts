import * as React from 'react'
import {
  SwitchNetworkArgs,
  SwitchNetworkResult,
  switchNetwork,
} from '@wagmi/core'
import { useMutation } from 'react-query'

import { useClient } from '../../context'
import { MutationConfig } from '../../types'
import { useForceUpdate } from '../utils'

export type UseSwitchNetworkArgs = Partial<SwitchNetworkArgs>

export type UseSwitchNetworkConfig = MutationConfig<
  SwitchNetworkResult,
  Error,
  SwitchNetworkArgs
>

export const mutationKey = (args: UseSwitchNetworkArgs) =>
  [{ entity: 'switchNetwork', ...args }] as const

const mutationFn = (args: UseSwitchNetworkArgs) => {
  const { chainId } = args
  if (!chainId) throw new Error('chainId is required')
  return switchNetwork({ chainId })
}

export function useSwitchNetwork({
  chainId,
  onError,
  onMutate,
  onSettled,
  onSuccess,
}: UseSwitchNetworkArgs & UseSwitchNetworkConfig = {}) {
  const client = useClient()
  const forceUpdate = useForceUpdate()

  React.useEffect(() => {
    const unwatch = client.subscribe(({ connector }) => connector, forceUpdate)
    return unwatch
  }, [client, forceUpdate])

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
  } = useMutation(mutationKey({ chainId }), mutationFn, {
    onError,
    onMutate,
    onSettled,
    onSuccess,
  })

  const switchNetwork_ = React.useCallback(
    (chainId_?: SwitchNetworkArgs['chainId']) =>
      mutate(<SwitchNetworkArgs>{ chainId: chainId_ ?? chainId }),
    [chainId, mutate],
  )

  const switchNetworkAsync_ = React.useCallback(
    (chainId_?: SwitchNetworkArgs['chainId']) =>
      mutateAsync(<SwitchNetworkArgs>{ chainId: chainId_ ?? chainId }),
    [chainId, mutateAsync],
  )

  return {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    pendingChainId: variables?.chainId,
    reset,
    status,
    switchNetwork: client.connector?.switchChain ? switchNetwork_ : undefined,
    switchNetworkAsync: client.connector?.switchChain
      ? switchNetworkAsync_
      : undefined,
    variables,
  } as const
}
