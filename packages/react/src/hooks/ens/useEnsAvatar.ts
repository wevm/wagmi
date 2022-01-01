import * as React from 'react'

import { useProvider } from '../providers'
import { useCacheBuster } from '../utils'

type Config = {
  addressOrName?: string | null
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

  const getEnsAvatar = React.useCallback(
    async (config?: { addressOrName: string }) => {
      try {
        const _config = config ?? { addressOrName }
        if (!_config.addressOrName) throw new Error('addressOrName is required')

        setState((x) => ({ ...x, error: undefined, loading: true }))
        const avatar = await provider.getAvatar(_config.addressOrName)
        setState((x) => ({ ...x, avatar, loading: false }))
        return avatar
      } catch (err) {
        const error = <Error>err
        setState((x) => ({ ...x, error, loading: false }))
        return error
      }
    },
    [addressOrName, provider],
  )

  // Fetch avatar when deps or chain changes
  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (skip || !addressOrName) return

    let didCancel = false
    if (didCancel) return
    getEnsAvatar({ addressOrName })

    return () => {
      didCancel = true
    }
  }, [addressOrName, cacheBuster, skip])
  /* eslint-enable react-hooks/exhaustive-deps */

  return [
    { data: state.avatar, loading: state.loading, error: state.error },
    getEnsAvatar,
  ] as const
}
