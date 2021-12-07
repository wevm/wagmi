import * as React from 'react'

import { useProvider } from './useProvider'
import { useWebSocketProvider } from './useWebSocketProvider'

type State = {
  blockNumber?: number
  error?: Error
  loading?: boolean
}

const initialState: State = {
  loading: false,
}

type Config = {
  skip?: boolean
  subscribe?: boolean
}

export const useBlockNumber = ({ skip, subscribe }: Config = {}) => {
  const provider = useProvider()
  const webSocketProvider = useWebSocketProvider()
  const [state, setState] = React.useState<State>(initialState)

  const getBlockNumber = React.useCallback(async () => {
    try {
      setState((x) => ({ ...x, error: undefined, loading: true }))
      const blockNumber = await provider.getBlockNumber()
      setState((x) => ({ ...x, blockNumber, loading: false }))
      return blockNumber
    } catch (_error) {
      const error = _error as Error
      setState((x) => ({ ...x, error, loading: false }))
      return error
    }
  }, [provider])

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (skip) return
    getBlockNumber()
  }, [])
  /* eslint-enable react-hooks/exhaustive-deps */

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (!subscribe) return

    const listener = (blockNumber: number) =>
      setState((x) => ({ ...x, blockNumber }))

    ;(webSocketProvider ?? provider).on('block', listener)
    return () => {
      ;(webSocketProvider ?? provider).off('block', listener)
    }
  }, [])
  /* eslint-enable react-hooks/exhaustive-deps */

  return [
    {
      blockNumber: state.blockNumber,
      loading: state.loading,
      error: state.error,
    },
    getBlockNumber,
  ] as const
}
