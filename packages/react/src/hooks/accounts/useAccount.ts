import * as React from 'react'

import { useContext } from '../../context'
import { useEnsAvatar, useEnsLookup } from '../ens'
import { useBalance } from './useBalance'

type Config = {
  fetchBalance?: boolean
  fetchEns?: boolean
}

export const useAccount = ({ fetchBalance, fetchEns }: Config = {}) => {
  const {
    state: { connector, data },
    setState,
  } = useContext()
  const address = data?.account
  const [{ data: ens, loading: ensLoading }] = useEnsLookup({
    address,
    skip: !fetchEns,
  })
  const [{ data: avatar, loading: resolverLoading }] = useEnsAvatar({
    addressOrName: ens,
    skip: !fetchEns || !ens,
  })
  const [{ data: balance, loading: balanceLoading }] = useBalance({
    address,
    skip: !fetchBalance,
  })

  const disconnect = React.useCallback(() => {
    setState((x) => {
      x.connector?.disconnect()
      return {}
    })
  }, [setState])

  const loading = ensLoading || resolverLoading || balanceLoading

  return [
    {
      data: address ? { address, ens, avatar, balance } : undefined,
      loading,
      connector,
    },
    disconnect,
  ] as const
}
