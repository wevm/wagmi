import * as React from 'react'

import { defaultChains, defaultL2Chains } from '../constants'
import { useContext } from './useContext'

type State = {
  error?: Error
}

const initialState: State = {}

export const useNetwork = () => {
  const [{ connector, data }] = useContext()
  const [state, setState] = React.useState<State>(initialState)

  const chainId = data?.chainId
  const activeChains = connector?.chains ?? []
  const activeChain = [
    ...activeChains,
    ...defaultChains,
    ...defaultL2Chains,
  ].find((x) => x.id === chainId)

  const switchNetwork = React.useCallback(
    (chainId: number) => {
      if (!connector?.switchChain) return false
      try {
        setState((x) => ({ ...x, error: undefined }))
        connector.switchChain(chainId)
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
      data: activeChain,
      error: state.error,
    },
    switchNetwork,
  ] as const
}
