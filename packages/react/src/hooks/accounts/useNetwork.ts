import * as React from 'react'
import { defaultChains, defaultL2Chains } from '@wagmi/private'

import { useContext } from '../../context'

type State = {
  error?: Error
}

const initialState: State = {}

export const useNetwork = () => {
  const {
    state: { connector, data },
  } = useContext()
  const [state, setState] = React.useState<State>(initialState)

  const chainId = data?.chainId
  const activeChains = connector?.chains ?? []
  const activeChain = [
    ...activeChains,
    ...defaultChains,
    ...defaultL2Chains,
  ].find((x) => x.id === chainId)
  const supported = activeChains.some((x) => x.id === chainId)

  const switchNetwork = React.useCallback(
    async (chainId: number) => {
      if (!connector?.switchChain) return false
      try {
        setState((x) => ({ ...x, error: undefined }))
        await connector.switchChain(chainId)
        return true
      } catch (_error) {
        const error = _error as Error
        setState((x) => ({ ...x, error }))
        return error
      }
    },
    [connector],
  )

  return [
    {
      chainId,
      chains: activeChains,
      data: {
        ...activeChain,
        unsupported: !supported,
      },
      error: state.error,
    },
    connector?.switchChain ? switchNetwork : undefined,
  ] as const
}
