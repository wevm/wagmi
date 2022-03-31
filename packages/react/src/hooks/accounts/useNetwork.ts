import * as React from 'react'
import {
  SwitchNetworkArgs,
  SwitchNetworkResult,
  getNetwork,
  switchNetwork,
  watchNetwork,
} from '@wagmi/core'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { useClient } from '../../context'
import { MutationConfig } from '../../types'

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

export const queryKey = () => [{ entity: 'chain' }] as const
const queryFn = () => getNetwork()

export function useNetwork({
  chainId,
  onError,
  onMutate,
  onSettled,
  onSuccess,
}: UseNetworkArgs & UseNetworkConfig = {}) {
  const [, forceUpdate] = React.useReducer((c) => c + 1, 0)
  const client = useClient()
  const queryClient = useQueryClient()

  const connector = client.connector
  const { mutate, mutateAsync, variables, ...networkMutation } = useMutation(
    mutationKey({ chainId }),
    mutationFn,
    {
      onError,
      onMutate,
      onSettled,
      onSuccess,
    },
  )

  const queryResult = useQuery(queryKey(), queryFn)
  React.useEffect(() => {
    const unwatch = watchNetwork((data) => {
      queryClient.setQueryData(queryKey(), data)
      forceUpdate()
    })
    return unwatch
  }, [queryClient])

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
    ...networkMutation,
    activeChain: queryResult.data?.chain,
    chains: queryResult.data?.chains ?? [],
    pendingChainId: variables?.chainId,
    switchNetwork: connector?.switchChain ? switchNetwork_ : undefined,
    switchNetworkAsync: connector?.switchChain
      ? switchNetworkAsync_
      : undefined,
  } as const
}
