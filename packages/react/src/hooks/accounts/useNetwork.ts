import * as React from 'react'
import {
  SwitchChainError,
  SwitchNetworkResult,
  getNetwork,
  watchNetwork,
} from '@wagmi/core'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { useClient } from '../../context'
import { MutationConfig } from '../../types'

export type UseConnectConfig = MutationConfig<
  SwitchNetworkResult,
  Error,
  number
>

export const mutationKey = [{ entity: 'switchNetwork' }]

export const queryKey = () => [{ entity: 'chain' }] as const
const queryFn = () => getNetwork()

export function useNetwork({
  onError,
  onMutate,
  onSettled,
  onSuccess,
}: UseConnectConfig = {}) {
  const [, forceUpdate] = React.useReducer((c) => c + 1, 0)
  const client = useClient()
  const queryClient = useQueryClient()

  const connector = client.connector
  const {
    mutate,
    mutateAsync,
    variables: pendingChainId,
    ...networkMutation
  } = useMutation(
    mutationKey,
    (chainId) => {
      if (!connector?.switchChain) throw new SwitchChainError()
      return connector.switchChain(chainId)
    },
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

  return {
    ...networkMutation,
    activeChain: queryResult.data?.chain,
    chains: queryResult.data?.chains ?? [],
    pendingChainId,
    switchNetwork: connector?.switchChain ? mutate : undefined,
    switchNetworkAsync: connector?.switchChain ? mutateAsync : undefined,
  } as const
}
