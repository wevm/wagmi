import * as React from 'react'
import { EnsResolver } from '@ethersproject/providers'

import { useProvider } from '../providers'
import { useCacheBuster, useCancel } from '../utils'

type Config = {
  /** ENS name */
  name?: string | null
  /** Disables fetching */
  skip?: boolean
}

type State = {
  error?: Error
  loading: boolean
  resolver?: EnsResolver | null
}

const initialState: State = {
  loading: false,
}

export const useEnsResolver = ({ name, skip }: Config = {}) => {
  const cacheBuster = useCacheBuster()
  const provider = useProvider()
  const [state, setState] = React.useState<State>(initialState)

  const cancelQuery = useCancel()
  const getEnsResolver = React.useCallback(
    async (config?: { name: Config['name'] }) => {
      let didCancel = false
      cancelQuery(() => {
        didCancel = true
      })

      try {
        const config_ = config ?? { name }
        if (!config_.name) throw new Error('name is required')

        setState((x) => ({ ...x, error: undefined, loading: true }))
        const resolver = await provider.getResolver(config_.name)
        if (!didCancel) {
          setState((x) => ({ ...x, loading: false, resolver }))
        }
        return { data: resolver, error: undefined }
      } catch (error_) {
        const error = <Error>error_
        if (!didCancel) {
          setState((x) => ({ ...x, error, loading: false }))
        }
        return { data: undefined, error }
      }
    },
    [cancelQuery, name, provider],
  )

  // Fetch avatar when deps or chain changes
  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (skip || !name) return
    getEnsResolver({ name })
    return cancelQuery
  }, [cacheBuster, cancelQuery, name, skip])
  /* eslint-enable react-hooks/exhaustive-deps */

  return [
    { data: state.resolver, loading: state.loading, error: state.error },
    getEnsResolver,
  ] as const
}
