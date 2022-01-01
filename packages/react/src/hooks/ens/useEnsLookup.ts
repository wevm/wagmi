import * as React from 'react'

import { useProvider } from '../providers'
import { useCacheBuster } from '../utils'

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
  const cacheBuster = useCacheBuster()
  const provider = useProvider()
  const [state, setState] = React.useState<State>(initialState)

  const lookupAddress = React.useCallback(
    async (config?: { address: string }) => {
      try {
        const _config = config ?? { address }
        if (!_config.address) throw new Error('address is required')

        setState((x) => ({ ...x, error: undefined, loading: true }))
        const ens = await provider.lookupAddress(_config.address)
        setState((x) => ({ ...x, ens, loading: false }))
        return ens
      } catch (err) {
        const error = <Error>err
        setState((x) => ({ ...x, error, loading: false }))
        return error
      }
    },
    [address, provider],
  )

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (skip || !address) return

    let didCancel = false
    if (didCancel) return
    lookupAddress({ address })

    return () => {
      didCancel = true
    }
  }, [address, cacheBuster, skip])
  /* eslint-enable react-hooks/exhaustive-deps */

  return [
    { data: state.ens, loading: state.loading, error: state.error },
    lookupAddress,
  ] as const
}
