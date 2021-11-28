import * as React from 'react'

import { useProvider } from './useProvider'

type State = {
  loading: boolean
  avatar?: string | null
  error?: Error
}

const initialState: State = {
  loading: false,
}

type Config = {
  name?: string | null
  skip?: boolean
}

export const useEnsAvatar = ({ name, skip }: Config = {}) => {
  const provider = useProvider()
  const [state, setState] = React.useState<State>(initialState)

  const getAvatar = React.useCallback(
    async (name: string) => {
      try {
        setState((x) => ({ ...x, error: undefined, loading: true }))
        const avatar = await provider.getAvatar(name)
        setState((x) => ({ ...x, avatar, loading: false }))
        return avatar
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
    if (!name || skip) return
    getAvatar(name)
  }, [name])
  /* eslint-enable react-hooks/exhaustive-deps */

  return [
    { avatar: state.avatar, loading: state.loading, error: state.error },
    getAvatar,
  ] as const
}
