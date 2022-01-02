import * as React from 'react'
import {
  TransactionReceipt,
  TransactionResponse,
} from '@ethersproject/providers'

import { useProvider } from '../providers'

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

  const wait = React.useCallback(
    async (config?: {
      confirmations?: Config['confirmations']
      hash?: Config['hash']
      timeout?: Config['timeout']
      wait?: Config['wait']
    }) => {
      try {
        const config_ = config ?? { confirmations, hash, timeout, wait: wait_ }
        if (!config_.hash && !config_.wait)
          throw new Error('hash or wait is required')

        let promise
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
        setState((x) => ({ ...x, loading: false, receipt }))
        return receipt
      } catch (error_) {
        const error = <Error>error_
        setState((x) => ({ ...x, error, loading: false }))
        return error
      }
    },
    [wait_, confirmations, hash, timeout, provider],
  )

  // Fetch balance when deps or chain changes
  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (skip || (!hash && !wait_)) return

    let didCancel = false
    if (didCancel) return
    // eslint-disable-next-line testing-library/await-async-utils
    wait({ confirmations, hash, timeout, wait: wait_ })

    return () => {
      didCancel = true
    }
  }, [wait_, hash, skip])
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
