import * as React from 'react'

import { useContext } from './useContext'

// https://ethereum-magicians.org/t/eip-3326-wallet-switchethereumchain/5471/3
// wallet_switchEthereumChain
// https://docs.metamask.io/guide/rpc-api.html#other-rpc-methods

export const useNetwork = () => {
  const [state] = useContext()

  const switchNetwork = React.useCallback(
    (chainId: string) => {
      if (!state.connector?.switchChain) return
      state.connector.switchChain(chainId)
    },
    [state.connector],
  )

  return [state.data?.chainId, switchNetwork] as const
}
