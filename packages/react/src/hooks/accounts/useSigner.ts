import * as React from 'react'
import { Signer } from 'ethers'

import { useContext } from '../../context'
import { useCacheBuster } from '../utils'

type Config = {
  /** Disables fetching */
  skip?: boolean
}

type State = {
  data?: Signer
  error?: Error
  loading?: boolean
}

const initialState: State = {
  data: undefined,
  error: undefined,
  loading: false,
}

export const useSigner = ({ skip }: Config = {}) => {
  const cacheBuster = useCacheBuster()
  const {
    state: { connector },
  } = useContext()
  const [state, setState] = React.useState<State>(initialState)

  const getSigner = React.useCallback(async () => {
    try {
      setState((x) => ({ ...x, error: undefined, loading: true }))
      const signer = await connector?.getSigner()
      setState((x) => ({ ...x, data: signer, loading: false }))
      return signer
    } catch (error_) {
      const error = <Error>error_
      setState((x) => ({ ...x, data: undefined, error, loading: false }))
    }
  }, [connector])

  React.useEffect(() => {
    if (skip) return

    let didCancel = false
    if (didCancel) return
    getSigner()

    return () => {
      didCancel = true
    }
  }, [cacheBuster, connector, getSigner, skip])

  return [state, getSigner] as const
}
