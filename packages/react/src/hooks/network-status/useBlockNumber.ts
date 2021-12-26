import * as React from 'react'

import { useProvider, useWebSocketProvider } from '../providers'

type Config = {
  skip?: boolean
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
    if (!watch) return

    const listener = (blockNumber: State['blockNumber']) =>
      setState((x) => ({ ...x, blockNumber }))
    const _provider = webSocketProvider ?? provider

    _provider.on('block', listener)
    return () => {
      _provider.off('block', listener)
    }
  }, [])
  /* eslint-enable react-hooks/exhaustive-deps */

  return [
    {
      data: state.blockNumber,
      error: state.error,
      loading: state.loading,
    },
    getBlockNumber,
  ] as const
}
