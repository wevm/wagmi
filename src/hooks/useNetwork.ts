import * as React from 'react'

import { defaultChains } from '../constants'
import { useContext } from './useContext'

export const useNetwork = () => {
  const [state] = useContext()
  const chainId = state.data?.chainId
  const activeChains = state.connector?.chains ?? []
  const activeChain = [...activeChains, ...defaultChains].find(
    (x) => x.id === chainId,
  )

  const switchNetwork = React.useCallback(
    (chainId: number) => {
      if (!state.connector?.switchChain) return
      state.connector.switchChain(chainId)
    },
    [state.connector],
  )

  return [
    {
      chainId,
      data: activeChain,
      chains: activeChains,
    },
    switchNetwork,
  ] as const
}
