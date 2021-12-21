import * as React from 'react'

import { useContext } from './useContext'
import { useEnsLookup } from './useEnsLookup'
import { useEnsAvatar } from './useEnsAvatar'

type Config = {
  skipEns?: boolean
}

export const useAccount = ({ skipEns }: Config = {}) => {
  const { state: { connector, data }, setState } = useContext()
  const address = data?.account
  const [{ ens, loading: ensLoading }] = useEnsLookup({
    address,
    skip: skipEns,
  })
  const [{ avatar, loading: resolverLoading }] = useEnsAvatar({
    nameOrAddress: ens,
    skip: skipEns || !ens,
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
