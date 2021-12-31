import * as React from 'react'
import {
  TransactionRequest,
  TransactionResponse,
} from '@ethersproject/providers'
import { ConnectorNotFoundError, UserRejectedRequestError } from 'wagmi-private'

import { useContext } from '../../context'

export type Config = {
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

  const sendTransaction = React.useCallback(
    async (config?: { request: Config['request'] }) => {
      try {
        const _config = config ?? { request }
        if (!_config.request) throw new Error('request is required')
        if (!connector) throw new ConnectorNotFoundError()

        setState((x) => ({ ...x, loading: true }))
        const signer = await connector.getSigner()
        const transaction = await signer.sendTransaction(_config.request)
        setState((x) => ({ ...x, loading: false, transaction }))
        return transaction
      } catch (err) {
        let error: Error = <Error>err
        if ((<ProviderRpcError>err).code === 4001)
          error = new UserRejectedRequestError()
        setState((x) => ({ ...x, error, loading: false }))
        return error
      }
    },
    [connector, request],
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
