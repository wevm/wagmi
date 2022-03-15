import { SwitchChainError, SwitchNetworkResult } from '@wagmi/core'
import { UseMutationOptions, useMutation } from 'react-query'

import { useClient } from '../../context'

type MutationOptions = UseMutationOptions<SwitchNetworkResult, Error, number>

export type UseConnectConfig = {
  /** Function fires when switch network is successful */
  onSuccess?: MutationOptions['onSuccess']
  /** Function fires if switch network encounters error */
  onError?: MutationOptions['onError']
  /** Function fires when switch network is either successful or encounters error */
  onSettled?: MutationOptions['onSettled']
}

export const useNetwork = ({
  onError,
  onSettled,
  onSuccess,
}: UseConnectConfig = {}) => {
  const client = useClient()
  const connector = client.connector
  const { mutate, mutateAsync, ...networkMutation } = useMutation(
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

  console.log('useNetwork', client)

  // const chainId = data?.chain?.id
  // const unsupported = data?.chain?.unsupported
  // const activeChains = connector?.chains ?? []
  // const activeChain: Chain | undefined = [...activeChains, ...allChains].find(
  //   (x) => x.id === chainId,
  // )

  const chains = connector?.chains ?? []

  return {
    ...networkMutation,
    chains,
    switchNetwork: connector?.switchChain ? mutate : undefined,
    switchNetworkAsync: connector?.switchChain ? mutateAsync : undefined,
  } as const
}
