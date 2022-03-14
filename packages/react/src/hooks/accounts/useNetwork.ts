import { SwitchChainError, SwitchNetworkResult } from '@wagmi/core'
import { UseMutationOptions, useMutation } from 'react-query'

import { useClient } from '../../context'

type MutationOptions = UseMutationOptions<SwitchNetworkResult, Error, number>

export type UseConnectConfig = {
  /** Function fires when connect is successful */
  onSuccess?: MutationOptions['onSuccess']
  /** Function fires if connect encounters error */
  onError?: MutationOptions['onError']
  /** Function fires when connect is either successful or encounters error */
  onSettled?: MutationOptions['onSettled']
}

export const useNetwork = ({
  onError,
  onSettled,
  onSuccess,
}: UseConnectConfig = {}) => {
  const client = useClient()
  const connector = client.connector
  const { error, isError, mutate, status } = useMutation(
    'network',
    (chainId) => {
      if (!connector?.switchChain) throw new SwitchChainError()
      return connector.switchChain(chainId)
    },
    {
      onError,
      onSettled,
      onSuccess,
    },
  )

  // const chainId = data?.chain?.id
  // const unsupported = data?.chain?.unsupported
  // const activeChains = connector?.chains ?? []
  // const activeChain: Chain | undefined = [...activeChains, ...allChains].find(
  //   (x) => x.id === chainId,
  // )

  const activeChains = connector?.chains ?? []

  return {
    chains: activeChains,
    error,
    isError,
    status,
    switchNetwork: connector?.switchChain ? mutate : undefined,
  } as const
}
