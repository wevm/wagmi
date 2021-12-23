import * as React from 'react'

import { useContext } from '../context'
import { useEnsAvatar, useEnsLookup } from './ens'

type Config = {
  fetchEns?: boolean
}

export const useAccount = ({ fetchEns }: Config = {}) => {
  const {
    state: { connector, data },
    setState,
  } = useContext()
  const address = data?.account
  const [{ ens, loading: ensLoading }] = useEnsLookup({
    address,
    skip: !fetchEns,
  })
  const [{ avatar, loading: resolverLoading }] = useEnsAvatar({
    addressOrName: ens,
    skip: !fetchEns || !ens,
  })

  const disconnect = React.useCallback(() => {
    setState((x) => {
      x.connector?.disconnect()
      return {}
    })
  }, [setState])

  const loading = ensLoading || resolverLoading

  return [
    {
      address,
      data: ens ? { ens, avatar } : undefined,
      loading,
      connector,
    },
    disconnect,
  ] as const
}
