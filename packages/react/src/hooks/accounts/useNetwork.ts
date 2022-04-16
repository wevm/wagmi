import * as React from 'react'
import {
  SwitchNetworkArgs,
  SwitchNetworkResult,
  getNetwork,
  switchNetwork,
  watchNetwork,
} from '@wagmi/core'
import { useMutation, useQueryClient } from 'react-query'

import { useClient } from '../../context'
import { MutationConfig } from '../../types'
import { useForceUpdate } from '../utils'

export type UseNetworkArgs = Partial<SwitchNetworkArgs>

export type UseNetworkConfig = MutationConfig<
  SwitchNetworkResult,
  Error,
  SwitchNetworkArgs
>

export const mutationKey = (args: UseNetworkArgs) => [
  { entity: 'switchNetwork', ...args },
]

const mutationFn = (args: UseNetworkArgs) => {
  const { chainId } = args
  if (!chainId) throw new Error('chainId is required')
  return switchNetwork({ chainId })
}

export function useNetwork({
  chainId,
  onError,
  onMutate,
  onSettled,
  onSuccess,
}: UseNetworkArgs & UseNetworkConfig = {}) {
  const forceUpdate = useForceUpdate()
  const network = React.useRef(getNetwork())

  const client = useClient()
  const queryClient = useQueryClient()

  const connector = client.connector
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

  React.useEffect(() => {
    const unwatch = watchNetwork((data) => {
      network.current = data
      forceUpdate()
    })
    return unwatch
  }, [forceUpdate, queryClient])

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
    activeChain: network.current.chain,
    chains: network.current.chains ?? [],
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    pendingChainId: variables?.chainId,
    reset,
    status,
    switchNetwork: connector?.switchChain ? switchNetwork_ : undefined,
    switchNetworkAsync: connector?.switchChain
      ? switchNetworkAsync_
      : undefined,
    variables,
  } as const
}
