import * as React from 'react'
import { BigNumberish, utils } from 'ethers'
import { FeeData } from '@ethersproject/providers'
import { Unit } from '@wagmi/core'

import { useProvider } from '../providers'
import { useCacheBuster, useCancel } from '../utils'
import { useBlockNumber } from './useBlockNumber'

type Config = {
  /** Units for formatting output */
  formatUnits?: Unit | number
  /** Disables fetching */
  skip?: boolean
  /** Subscribe to changes */
  watch?: boolean
}

type State = {
  feeData?: FeeData
  error?: Error
  loading?: boolean
}

const initialState: State = {
  loading: false,
}

export const useFeeData = ({
  formatUnits = 'wei',
  skip,
  watch,
}: Config = {}) => {
  const provider = useProvider()
  const [{ data: blockNumber }] = useBlockNumber({ skip: true, watch })
  const cacheBuster = useCacheBuster()
  const [state, setState] = React.useState<State>(initialState)

  const cancelQuery = useCancel()
  const getFeeData = React.useCallback(async () => {
    let didCancel = false
    cancelQuery(() => {
      didCancel = true
    })
    try {
      setState((x) => ({ ...x, error: undefined, loading: true }))
      const feeData = await provider.getFeeData()
      if (!didCancel) {
        setState((x) => ({ ...x, feeData, loading: false }))
      }
      return { data: feeData, error: undefined }
    } catch (error_) {
      const error = <Error>error_
      if (!didCancel) {
        setState((x) => ({ ...x, error, loading: false }))
      }
      return { data: undefined, error }
    }
  }, [cancelQuery, provider])

  // Fetch feeData on mount or when chain changes
  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (skip) return
    getFeeData()
    return cancelQuery
  }, [cacheBuster, cancelQuery, skip])
  /* eslint-enable react-hooks/exhaustive-deps */

  React.useEffect(() => {
    if (!watch || !blockNumber) return
    getFeeData()
    return cancelQuery
  }, [blockNumber, cancelQuery, getFeeData, watch])

  const formatted = state.feeData
    ? {
        gasPrice: utils.formatUnits(
          <BigNumberish>state.feeData.gasPrice,
          formatUnits,
        ),
        maxFeePerGas: utils.formatUnits(
          <BigNumberish>state.feeData.maxFeePerGas,
          formatUnits,
        ),
        maxPriorityFeePerGas: utils.formatUnits(
          <BigNumberish>state.feeData.maxPriorityFeePerGas,
          formatUnits,
        ),
      }
    : undefined

  return [
    {
      data: state.feeData ? { ...state.feeData, formatted } : undefined,
      loading: state.loading,
      error: state.error,
    },
    getFeeData,
  ] as const
}
