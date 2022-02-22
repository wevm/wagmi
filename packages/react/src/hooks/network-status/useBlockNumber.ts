import * as React from 'react'

import { useProvider, useWebSocketProvider } from '../providers'
import { useCacheBuster, useCancel } from '../utils'

type Config = {
  /** Disables fetching */
  skip?: boolean
  /** Subscribe to changes */
  watch?: boolean
}

type State = {
  blockNumber?: number
  error?: Error
  loading?: boolean
}

const initialState: State = {
  loading: false,
}

export const useBlockNumber = ({ skip, watch }: Config = {}) => {
  const cacheBuster = useCacheBuster()
  const provider = useProvider()
  const webSocketProvider = useWebSocketProvider()
  const [state, setState] = React.useState<State>(initialState)

  const cancelQuery = useCancel()
  const getBlockNumber = React.useCallback(async () => {
    let didCancel = false
    cancelQuery(() => {
      didCancel = true
    })
    try {
      setState((x) => ({ ...x, error: undefined, loading: true }))
      const blockNumber = await provider.getBlockNumber()
      if (!didCancel) {
        setState((x) => ({ ...x, blockNumber, loading: false }))
      }
      return { data: blockNumber, error: undefined }
    } catch (error_) {
      const error = <Error>error_
      if (!didCancel) {
        setState((x) => ({ ...x, error, loading: false }))
      }
      return { data: undefined, error }
    }
  }, [cancelQuery, provider])

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (skip) return
    getBlockNumber()
    return cancelQuery
  }, [cacheBuster, cancelQuery, skip])
  /* eslint-enable react-hooks/exhaustive-deps */

  React.useEffect(() => {
    if (!watch) return
    let didCancel = false

    const listener = (blockNumber: State['blockNumber']) => {
      // Just to be safe in case the provider implementation
      // calls the event callback after .off() has been called
      if (!didCancel) {
        setState((x) => ({ ...x, blockNumber }))
      }
    }

    const provider_ = webSocketProvider ?? provider
    provider_.on('block', listener)

    return () => {
      didCancel = true
      provider_.off('block', listener)
    }
  }, [provider, watch, webSocketProvider])

  return [
    {
      data: state.blockNumber,
      error: state.error,
      loading: state.loading,
    },
    getBlockNumber,
  ] as const
}
