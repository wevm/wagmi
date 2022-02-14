import * as React from 'react'
import {
  TransactionReceipt,
  TransactionResponse,
} from '@ethersproject/providers'

import { useProvider } from '../providers'
import { useCancel } from '../utils'

export type Config = {
  /**
   * Number of blocks to wait for after transaction is mined
   * @default 1
   */
  confirmations?: number
  /** Transaction hash to monitor */
  hash?: string
  /** Disables fetching */
  skip?: boolean
  /*
   * Maximum amount of time to wait before timing out in milliseconds
   * @default 0
   */
  timeout?: number
  /** Function resolving to transaction receipt */
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
  wait: wait_,
}: Config = {}) => {
  const provider = useProvider()
  const [state, setState] = React.useState<State>(initialState)

  const cancelQuery = useCancel()
  const wait = React.useCallback(
    async (config?: {
      confirmations?: Config['confirmations']
      hash?: Config['hash']
      timeout?: Config['timeout']
      wait?: Config['wait']
    }) => {
      let didCancel = false
      cancelQuery(() => {
        didCancel = true
      })

      try {
        const config_ = config ?? { confirmations, hash, timeout, wait: wait_ }
        if (!config_.hash && !config_.wait)
          throw new Error('hash or wait is required')

        let promise: Promise<TransactionReceipt>
        // eslint-disable-next-line testing-library/await-async-utils
        if (config_.wait) promise = config_.wait(config_.confirmations)
        else if (config_.hash)
          promise = provider.waitForTransaction(
            config_.hash,
            config_.confirmations,
            config_.timeout,
          )
        else throw new Error('hash or wait is required')

        setState((x) => ({ ...x, loading: true }))
        const receipt = await promise
        if (!didCancel) {
          setState((x) => ({ ...x, loading: false, receipt }))
        }
        return { data: receipt, error: undefined }
      } catch (error_) {
        const error = <Error>error_
        if (!didCancel) {
          setState((x) => ({ ...x, error, loading: false }))
        }
        return { data: undefined, error }
      }
    },
    [cancelQuery, confirmations, hash, provider, timeout, wait_],
  )

  // Fetch balance when deps or chain changes
  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (skip || (!hash && !wait_)) return
    /* eslint-disable testing-library/await-async-utils */
    wait({ confirmations, hash, timeout, wait: wait_ })
    /* eslint-enable testing-library/await-async-utils */
    return cancelQuery
  }, [cancelQuery, hash, skip, wait_])
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
