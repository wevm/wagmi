import * as React from 'react'
import {
  TransactionRequest,
  TransactionResponse,
} from '@ethersproject/providers'
import { ConnectorNotFoundError, UserRejectedRequestError } from '@wagmi/core'

import { useContext } from '../../context'
import { useCancel } from '../utils'

export type Config = {
  /** Object to use when creating transaction */
  request?: TransactionRequest
}

type State = {
  transaction?: TransactionResponse
  error?: Error
  loading?: boolean
}

const initialState: State = {
  loading: false,
}

export const useTransaction = ({ request }: Config = {}) => {
  const {
    state: { connector },
  } = useContext()
  const [state, setState] = React.useState<State>(initialState)

  const cancelQuery = useCancel()
  const sendTransaction = React.useCallback(
    async (config?: { request: Config['request'] }) => {
      let didCancel = false
      cancelQuery(() => {
        didCancel = true
      })

      try {
        const config_ = config ?? { request }
        if (!config_.request) throw new Error('request is required')
        if (!connector) throw new ConnectorNotFoundError()

        setState((x) => ({ ...x, loading: true }))
        const signer = await connector.getSigner()
        const transaction = await signer.sendTransaction(config_.request)
        if (!didCancel) {
          setState((x) => ({ ...x, loading: false, transaction }))
        }
        return { data: transaction, error: undefined }
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
    [cancelQuery, connector, request],
  )

  return [
    {
      data: state.transaction,
      error: state.error,
      loading: state.loading,
    },
    sendTransaction,
  ] as const
}
