import * as React from 'react'
import {
  TransactionReceipt,
  TransactionResponse,
} from '@ethersproject/providers'

import { useProvider } from '../providers'

export type Config = {
  confirmations?: number
  hash?: string
  skip?: boolean
  timeout?: number
  wait?: TransactionResponse['wait']
}

type State = {
  receipt?: TransactionReceipt
  error?: Error
  loading?: boolean
}

const initialState: State = {
  loading: false,
}

export const useWaitForTransaction = ({
  confirmations,
  hash,
  skip,
  timeout,
  wait: _wait,
}: Config = {}) => {
  const provider = useProvider()
  const [state, setState] = React.useState<State>(initialState)

  const wait = React.useCallback(
    async (config?: {
      confirmations?: Config['confirmations']
      hash?: Config['hash']
      timeout?: Config['timeout']
      wait?: Config['wait']
    }) => {
      try {
        const _config = config ?? { confirmations, hash, timeout, wait: _wait }
        if (!_config.hash && !_config.wait)
          throw new Error('hash or wait is required')

        let promise
        // eslint-disable-next-line testing-library/await-async-utils
        if (_config.wait) promise = _config.wait(_config.confirmations)
        else if (_config.hash)
          promise = provider.waitForTransaction(
            _config.hash,
            _config.confirmations,
            _config.timeout,
          )
        else throw new Error('hash or wait is required')

        setState((x) => ({ ...x, loading: true }))
        const receipt = await promise
        setState((x) => ({ ...x, loading: false, receipt }))
        return receipt
      } catch (err) {
        const error = <Error>err
        setState((x) => ({ ...x, error, loading: false }))
        return error
      }
    },
    [_wait, confirmations, hash, timeout, provider],
  )

  // Fetch balance when deps or chain changes
  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (skip || (!hash && !_wait)) return

    let didCancel = false
    if (didCancel) return
    // eslint-disable-next-line testing-library/await-async-utils
    wait({ confirmations, hash, timeout, wait: _wait })

    return () => {
      didCancel = true
    }
  }, [_wait, hash, skip])
  /* eslint-enable react-hooks/exhaustive-deps */

  return [
    {
      data: state.receipt,
      error: state.error,
      loading: state.loading,
    },
    wait,
  ] as const
}
