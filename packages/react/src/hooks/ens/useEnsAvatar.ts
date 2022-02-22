import * as React from 'react'

import { useProvider } from '../providers'
import { useCacheBuster, useCancel } from '../utils'

type Config = {
  /** Address or ENS name */
  addressOrName?: string | null
  /** Disables fetching */
  skip?: boolean
}

type State = {
  avatar?: string | null
  error?: Error
  loading: boolean
}

const initialState: State = {
  loading: false,
}

export const useEnsAvatar = ({ addressOrName, skip }: Config = {}) => {
  const cacheBuster = useCacheBuster()
  const provider = useProvider()
  const [state, setState] = React.useState<State>(initialState)

  const cancelQuery = useCancel()
  const getEnsAvatar = React.useCallback(
    async (config?: { addressOrName: string }) => {
      let didCancel = false
      cancelQuery(() => {
        didCancel = true
      })

      try {
        const config_ = config ?? { addressOrName }
        if (!config_.addressOrName) throw new Error('addressOrName is required')

        setState((x) => ({ ...x, error: undefined, loading: true }))
        const avatar = await provider.getAvatar(config_.addressOrName)
        if (!didCancel) {
          setState((x) => ({ ...x, avatar, loading: false }))
        }
        return avatar
      } catch (error_) {
        const error = <Error>error_
        if (!didCancel) {
          setState((x) => ({ ...x, error, loading: false }))
        }
        return error
      }
    },
    [addressOrName, cancelQuery, provider],
  )

  // Fetch avatar when deps or chain changes
  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (skip || !addressOrName) return
    getEnsAvatar({ addressOrName })
    return cancelQuery
  }, [addressOrName, cacheBuster, cancelQuery, skip])
  /* eslint-enable react-hooks/exhaustive-deps */

  return [
    { data: state.avatar, loading: state.loading, error: state.error },
    getEnsAvatar,
  ] as const
}
