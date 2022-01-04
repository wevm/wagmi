import * as React from 'react'
import { Bytes } from 'ethers/lib/utils'
import { ConnectorNotFoundError, UserRejectedRequestError } from 'wagmi-private'

import { useContext } from '../../context'

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

  const signMessage = React.useCallback(
    async (config?: { message?: Config['message'] }) => {
      try {
        const config_ = config ?? { message }
        if (!config_.message) throw new Error('message is required')
        if (!connector) throw new ConnectorNotFoundError()

        setState((x) => ({ ...x, error: undefined, loading: true }))
        const signer = await connector.getSigner()
        const signature = await signer.signMessage(config_.message)
        setState((x) => ({ ...x, signature, loading: false }))
        return { data: signature, error: undefined }
      } catch (error_) {
        let error: Error = <Error>error_
        if ((<ProviderRpcError>error_).code === 4001)
          error = new UserRejectedRequestError()
        setState((x) => ({ ...x, error, loading: false }))
        return { data: undefined, error }
      }
    },
    [connector, message],
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
