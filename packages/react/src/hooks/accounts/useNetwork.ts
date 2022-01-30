import * as React from 'react'
import { Chain, SwitchChainError, allChains } from 'wagmi-private'

import { useContext } from '../../context'

type State = {
  error?: Error
  loading?: boolean
}

const initialState: State = {
  loading: false,
}

export const useNetwork = () => {
  const {
    state: { connector, data },
  } = useContext()
  const [state, setState] = React.useState<State>(initialState)

  const chainId = data?.chain?.id
  const unsupported = data?.chain?.unsupported
  const activeChains = connector?.chains ?? []
  const activeChain: Chain | undefined = [...activeChains, ...allChains].find(
    (x) => x.id === chainId,
  )

  const switchNetwork = React.useCallback(
    async (chainId: number) => {
      if (!connector?.switchChain)
        return { data: undefined, error: new SwitchChainError() }
      try {
        setState((x) => ({ ...x, error: undefined, loading: true }))
        const chain = await connector.switchChain(chainId)
        setState((x) => ({ ...x, loading: false }))
        return { data: chain, error: undefined }
      } catch (error_) {
        const error = <Error>error_
        setState((x) => ({ ...x, error, loading: false }))
        return { data: undefined, error }
      }
    },
    [connector],
  )

  return [
    {
      data: {
        chain: chainId
          ? {
              ...activeChain,
              id: chainId,
              unsupported,
            }
          : undefined,
        chains: activeChains,
      },
      error: state.error,
      loading: state.loading,
    },
    connector?.switchChain ? switchNetwork : undefined,
  ] as const
}
