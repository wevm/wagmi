import * as React from 'react'

import { useContext } from '../../context'
import { useEnsAvatar, useEnsLookup } from '../ens'

export type Config = {
  /** Fetches ENS for connected account */
  fetchEns?: boolean
}

export const useAccount = ({ fetchEns }: Config = {}) => {
  const { state: globalState, setState } = useContext()
  const address = globalState.data?.account
  const [{ data: ens, error: ensError, loading: ensLoading }] = useEnsLookup({
    address,
    skip: !fetchEns,
  })
  const [{ data: avatar, error: avatarError, loading: avatarLoading }] =
    useEnsAvatar({
      addressOrName: ens,
      skip: !fetchEns || !ens,
    })

  const disconnect = React.useCallback(() => {
    setState((x) => {
      x.connector?.disconnect()
      return { cacheBuster: x.cacheBuster + 1 }
    })
  }, [setState])

  const error = ensError || avatarError
  const loading = ensLoading || avatarLoading

  return [
    {
      data: address
        ? {
            address,
            connector: globalState.connector,
            ens: ens ? { avatar, name: ens } : undefined,
          }
        : undefined,
      error,
      loading,
    },
    disconnect,
  ] as const
}
