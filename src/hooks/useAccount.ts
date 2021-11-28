import * as React from 'react'

import { useContext } from './useContext'
import { useENSLookUp } from './useENSLookup'

export const useAccount = () => {
  const [{ connector, data }, setState] = useContext()
  const address = data?.account
  const [{ ens }] = useENSLookUp({ address })
  console.log({ ens })

  const disconnect = React.useCallback(() => {
    setState((x) => {
      x.connector?.disconnect()
      return {}
    })
  }, [setState])

  return [
    {
      address,
      connector: connector,
    },
    disconnect,
  ] as const
}
