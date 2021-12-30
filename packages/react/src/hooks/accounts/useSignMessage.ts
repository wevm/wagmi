import * as React from 'react'
import { Message } from 'wagmi-private'

import { useContext } from '../../context'

export type Config = {
  message?: Message
}

type State = {
  signature?: string
  error?: Error
  loading?: boolean
}

const initialState: State = {
  loading: false,
}

export const useSignMessage = ({ message }: Config = {}) => {
  const {
    state: { connector },
  } = useContext()
  const [state, setState] = React.useState<State>(initialState)

  const signMessage = React.useCallback(
    async (config?: { message?: Message }) => {
      try {
        const _config = config ?? { message }
        if (!_config.message) throw new Error('message is required')
        if (!connector) throw new Error('No wallet connected')

        setState((x) => ({ ...x, error: undefined, loading: true }))
        const signature = await connector.signMessage({
          message: _config.message,
        })
        setState((x) => ({ ...x, signature, loading: false }))
        return signature
      } catch (_error) {
        const error = _error as Error
        setState((x) => ({ ...x, error, loading: false }))
        return error
      }
    },
    [message, connector],
  )

  return [
    {
      data: state.signature,
      error: state.error,
      loading: state.loading,
    },
    signMessage,
  ] as const
}
