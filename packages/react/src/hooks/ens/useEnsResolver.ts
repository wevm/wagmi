import * as React from 'react'
import { EnsResolver } from '@ethersproject/providers'

import { useProvider } from '../providers'
import { useCacheBuster } from '../utils'

type Config = {
  name?: string | null
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

  const getEnsResolver = React.useCallback(
    async (config?: { name: Config['name'] }) => {
      try {
        const _config = config ?? { name }
        if (!_config.name) throw new Error('name is required')

        setState((x) => ({ ...x, error: undefined, loading: true }))
        const resolver = await provider.getResolver(_config.name)
        setState((x) => ({ ...x, loading: false, resolver }))
        return resolver
      } catch (err) {
        const error = <Error>err
        setState((x) => ({ ...x, error, loading: false }))
        return error
      }
    },
    [name, provider],
  )

  // Fetch avatar when deps or chain changes
  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (skip || !name) return

    let didCancel = false
    if (didCancel) return
    getEnsResolver({ name })

    return () => {
      didCancel = true
    }
  }, [name, cacheBuster, skip])
  /* eslint-enable react-hooks/exhaustive-deps */

  return [
    { data: state.resolver, loading: state.loading, error: state.error },
    getEnsResolver,
  ] as const
}
