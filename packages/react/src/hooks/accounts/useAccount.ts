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
  const [{ data: ens, error: ensError, loading: ensLoading }] = useEnsLookup({
    address,
    skip: !fetchEns,
  })
  const [{ data: avatar, error: avatarError, loading: avatarLoading }] =
    useEnsAvatar({
      addressOrName: ens,
      skip: !fetchEns || !ens,
    })
  const [{ data: balance, error: balanceError, loading: balanceLoading }] =
    useBalance({
      address,
      skip: !fetchBalance,
    })

  const disconnect = React.useCallback(() => {
    setState((x) => {
      x.connector?.disconnect()
      return { cacheBuster: x.cacheBuster + 1 }
    })
  }, [setState])

  const error = ensError || avatarError || balanceError
  const loading = ensLoading || avatarLoading || balanceLoading

  return [
    {
      data: address
        ? {
            address,
            balance,
            connector,
            ens: ens ? { avatar, name: ens } : undefined,
          }
        : undefined,
      error,
      loading,
    },
    disconnect,
  ] as const
}
