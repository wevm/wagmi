import * as React from 'react'

import { useProvider } from '../providers'
import { useCacheBuster, useCancel } from '../utils'

type Config = {
  /** Address to look up */
  address?: string
  /** Disables fetching */
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

  const cancelQuery = useCancel()
  const lookupAddress = React.useCallback(
    async (config?: { address: string }) => {
      let didCancel = false
      cancelQuery(() => {
        didCancel = true
      })

      try {
        const config_ = config ?? { address }
        if (!config_.address) throw new Error('address is required')

        setState((x) => ({ ...x, error: undefined, loading: true }))
        const ens = await provider.lookupAddress(config_.address)
        if (!didCancel) {
          setState((x) => ({ ...x, ens, loading: false }))
        }
        return { data: ens, error: undefined }
      } catch (error_) {
        const error = <Error>error_
        if (!didCancel) {
          setState((x) => ({ ...x, error, loading: false }))
        }
        return { data: undefined, error }
      }
    },
    [address, cancelQuery, provider],
  )

  // Resolve name when deps or chain changes
  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (skip || !address) return
    lookupAddress({ address })
    return cancelQuery
  }, [address, cacheBuster, cancelQuery, skip])
  /* eslint-enable react-hooks/exhaustive-deps */

  return [
    { data: state.ens, loading: state.loading, error: state.error },
    lookupAddress,
  ] as const
}
