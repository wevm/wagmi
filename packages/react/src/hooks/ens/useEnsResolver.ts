import * as React from 'react'
import { EnsResolver } from '@ethersproject/providers'

import { useProvider } from '../providers'

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
  const provider = useProvider()
  const [state, setState] = React.useState<State>(initialState)

  const getEnsResolver = React.useCallback(
    async (config: Pick<Config, 'name'>) => {
      try {
        if (!config.name) return
        setState((x) => ({ ...x, error: undefined, loading: true }))
        const resolver = await provider.getResolver(config.name)
        setState((x) => ({ ...x, loading: false, resolver }))
        return resolver
      } catch (_error) {
        const error = _error as Error
        setState((x) => ({ ...x, error, loading: false }))
      }
    },
    [provider],
  )

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (!name || skip) return
    getEnsResolver({ name })
  }, [name])
  /* eslint-enable react-hooks/exhaustive-deps */

  return [
    { data: state.resolver, loading: state.loading, error: state.error },
    getEnsResolver,
  ] as const
}
