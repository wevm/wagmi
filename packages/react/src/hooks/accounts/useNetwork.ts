import * as React from 'react'
import { Chain, defaultChains, defaultL2Chains } from 'wagmi-private'

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

  const chainId = data?.chainId
  const activeChains = connector?.chains ?? []
  const activeChain: Chain | undefined = [
    ...activeChains,
    ...defaultChains,
    ...defaultL2Chains,
  ].find((x) => x.id === chainId)
  const supported = activeChains.some((x) => x.id === chainId)

  const switchNetwork = React.useCallback(
    async (chainId: number) => {
      if (!connector?.switchChain) return false
      try {
        setState((x) => ({ ...x, error: undefined, loading: true }))
        await connector.switchChain(chainId)
        setState((x) => ({ ...x, loading: false }))
        return true
      } catch (err) {
        const error = <Error>err
        setState((x) => ({ ...x, error, loading: false }))
        return error
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
              unsupported: !supported,
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
