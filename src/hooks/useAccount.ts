import * as React from 'react'

import { useContext } from './useContext'

export const useAccount = () => {
  const [state, setState] = useContext()

  const disconnect = React.useCallback(() => {
    setState((x) => {
      x.connector?.disconnect()
      return {}
    })
  }, [setState])

  return [state.data?.account, disconnect] as const
}
