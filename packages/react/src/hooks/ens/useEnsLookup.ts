import * as React from 'react'

import { useProvider } from '../providers'

type Config = {
  address?: string
  skip?: boolean
}

type State = {
  ens?: string | null
  error?: Error
  loading: boolean
}

const initialState: State = {
  loading: false,
}

export const useEnsLookup = ({ address, skip }: Config = {}) => {
  const provider = useProvider()
  const [state, setState] = React.useState<State>(initialState)

  const lookupAddress = React.useCallback(
    async (config: Pick<Config, 'address'>) => {
      try {
        if (!config.address) return
        setState((x) => ({ ...x, error: undefined, loading: true }))
        const ens = await provider.lookupAddress(config.address)
        setState((x) => ({ ...x, ens, loading: false }))
        return ens
      } catch (_error) {
        const error = _error as Error
        setState((x) => ({ ...x, error, loading: false }))
        return error
      }
    },
    [provider],
  )

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (!address || skip) return
    lookupAddress({ address })
  }, [address])
  /* eslint-enable react-hooks/exhaustive-deps */

  return [
    { data: state.ens, loading: state.loading, error: state.error },
    lookupAddress,
  ] as const
}
