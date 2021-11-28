import * as React from 'react'

import { useProvider } from './useProvider'

type State = {
  loading: boolean
  ens?: string | null
  error?: Error
}

const initialState: State = {
  loading: false,
}

type Config = {
  address?: string
  skip?: boolean
}

export const useENSLookUp = ({ address, skip }: Config = {}) => {
  const provider = useProvider()
  const [state, setState] = React.useState<State>(initialState)

  const fetchENS = React.useCallback(
    async (address) => {
      try {
        setState((x) => ({ ...x, error: undefined, loading: true }))
        const ens = await provider.lookupAddress(address)
        setState((x) => ({ ...x, ens }))
      } catch (error) {
        setState((x) => ({ ...x, error: error as Error }))
      } finally {
        setState((x) => ({ ...x, loading: false }))
      }
    },
    [provider],
  )

  // Fetch on mount
  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (!address || skip) return
    fetchENS(address)
  }, [address])
  /* eslint-enable react-hooks/exhaustive-deps */

  return [
    { ens: state.ens, loading: state.loading, error: state.error },
    fetchENS,
  ] as const
}
