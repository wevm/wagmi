import * as React from 'react'
import { Bytes } from 'ethers/lib/utils'
import { ConnectorNotFoundError, UserRejectedRequestError } from '@wagmi/core'

import { useContext } from '../../context'
import { useCancel } from '../utils'

export type Config = {
  /** Message to sign with wallet */
  message?: Bytes | string
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

  const cancelQuery = useCancel()
  const signMessage = React.useCallback(
    async (config?: { message?: Config['message'] }) => {
      let didCancel = false
      cancelQuery(() => {
        didCancel = true
      })

      try {
        const config_ = config ?? { message }
        if (!config_.message) throw new Error('message is required')
        if (!connector) throw new ConnectorNotFoundError()

        setState((x) => ({ ...x, error: undefined, loading: true }))
        const signer = await connector.getSigner()
        const signature = await signer.signMessage(config_.message)
        if (!didCancel) {
          setState((x) => ({ ...x, signature, loading: false }))
        }
        return { data: signature, error: undefined }
      } catch (error_) {
        let error: Error = <Error>error_
        if ((<ProviderRpcError>error_).code === 4001)
          error = new UserRejectedRequestError()
        if (!didCancel) {
          setState((x) => ({ ...x, error, loading: false }))
        }
        return { data: undefined, error }
      }
    },
    [cancelQuery, connector, message],
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
