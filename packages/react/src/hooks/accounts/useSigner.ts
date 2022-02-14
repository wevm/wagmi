import * as React from 'react'
import { Signer } from 'ethers'

import { useContext } from '../../context'
import { useCacheBuster, useCancel } from '../utils'

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

  const cancelQuery = useCancel()
  const getSigner = React.useCallback(async () => {
    let didCancel = false
    cancelQuery(() => {
      didCancel = true
    })

    try {
      setState((x) => ({ ...x, error: undefined, loading: true }))
      const signer = await connector?.getSigner()
      if (!didCancel) {
        setState((x) => ({ ...x, data: signer, loading: false }))
      }
      return signer
    } catch (error_) {
      const error = <Error>error_
      if (!didCancel) {
        setState((x) => ({ ...x, data: undefined, error, loading: false }))
      }
    }
  }, [cancelQuery, connector])

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (skip) return
    getSigner()
    return cancelQuery
  }, [cacheBuster, connector, cancelQuery, skip])
  /* eslint-enable react-hooks/exhaustive-deps */

  return [state, getSigner] as const
}
