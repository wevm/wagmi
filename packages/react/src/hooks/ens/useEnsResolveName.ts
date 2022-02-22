import * as React from 'react'

import { useProvider } from '../providers'
import { useCacheBuster, useCancel } from '../utils'

type Config = {
  /** Name to look up */
  name?: string
  /** Disables fetching */
  skip?: boolean
}

type State = {
  address?: string | null
  error?: Error
  loading: boolean
}

const initialState: State = {
  loading: false,
}

export const useEnsResolveName = ({ name, skip }: Config = {}) => {
  const cacheBuster = useCacheBuster()
  const provider = useProvider()
  const [state, setState] = React.useState<State>(initialState)

  const cancelQuery = useCancel()
  const resolveName = React.useCallback(
    async (config?: { name: string }) => {
      let didCancel = false
      cancelQuery(() => {
        didCancel = true
      })

      try {
        const config_ = config ?? { name }
        if (!config_.name) throw new Error('name is required')

        setState((x) => ({ ...x, error: undefined, loading: true }))
        const address = await provider.resolveName(config_.name)
        if (!didCancel) {
          setState((x) => ({ ...x, address, loading: false }))
        }
        return { data: address, error: undefined }
      } catch (error_) {
        const error = <Error>error_
        if (!didCancel) {
          setState((x) => ({ ...x, error, loading: false }))
        }
        return { data: undefined, error }
      }
    },
    [name, cancelQuery, provider],
  )

  // Resolve name when deps or chain changes
  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (skip || !name) return
    resolveName({ name })
    return cancelQuery
  }, [name, cacheBuster, cancelQuery, skip])
  /* eslint-enable react-hooks/exhaustive-deps */

  return [
    { data: state.address, loading: state.loading, error: state.error },
    resolveName,
  ] as const
}
